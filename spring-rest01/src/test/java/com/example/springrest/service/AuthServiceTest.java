package com.example.springrest.service;

import com.example.springrest.exception.AuthenticationException;
import com.example.springrest.exception.RateLimitException;
import com.example.springrest.model.dto.LoginRequest;
import com.example.springrest.model.dto.LoginResponse;
import com.example.springrest.model.entity.User;
import com.example.springrest.model.enums.UserRole;
import com.example.springrest.repository.LoginAttemptMapper;
import com.example.springrest.repository.UserMapper;
import com.example.springrest.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * AuthService 단위 테스트
 * Spec: User Story 1 - 사용자 로그인
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService 단위 테스트")
class AuthServiceTest {

    @Mock
    private UserMapper userMapper;

    @Mock
    private LoginAttemptMapper loginAttemptMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private LoginAttemptService loginAttemptService;

    @InjectMocks
    private AuthService authService;

    private User testUser;
    private LoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .username("testuser")
                .password("$2a$10$hashedPassword")
                .email("test@example.com")
                .role(UserRole.USER)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        loginRequest = LoginRequest.builder()
                .username("testuser")
                .password("password123")
                .build();
    }

    @Test
    @DisplayName("US1-AC1: 올바른 아이디와 비밀번호로 로그인하면 JWT 토큰을 받는다")
    void loginSuccess_ReturnsJwtToken() {
        // Given: 등록된 사용자 계정이 존재하고, 비밀번호가 일치함
        when(userMapper.findByUsername("testuser")).thenReturn(testUser);
        when(passwordEncoder.matches("password123", testUser.getPassword())).thenReturn(true);
        when(jwtTokenProvider.generateToken("testuser", UserRole.USER)).thenReturn("jwt.token.here");
        when(jwtTokenProvider.getExpirationMs()).thenReturn(1800000L); // 30분

        // When: 로그인 요청을 보냄
        LoginResponse response = authService.login(loginRequest, "127.0.0.1", "TestAgent");

        // Then: JWT 토큰이 포함된 성공 응답을 받음
        assertThat(response).isNotNull();
        assertThat(response.getToken()).isEqualTo("jwt.token.here");
        assertThat(response.getTokenType()).isEqualTo("Bearer");
        assertThat(response.getExpiresIn()).isEqualTo(1800000L);
        assertThat(response.getUser()).isNotNull();
        assertThat(response.getUser().getUsername()).isEqualTo("testuser");
        assertThat(response.getUser().getEmail()).isEqualTo("test@example.com");

        // 로그인 성공 기록 확인
        verify(loginAttemptMapper, times(1)).insert(argThat(attempt ->
                attempt.getUsername().equals("testuser") &&
                Boolean.TRUE.equals(attempt.getSuccess()) &&
                attempt.getIpAddress().equals("127.0.0.1")
        ));

        // Rate Limit 체크 확인
        verify(loginAttemptService, times(1)).checkRateLimit("testuser");

        // 차단 캐시 초기화 확인
        verify(loginAttemptService, times(1)).clearLoginAttempts("testuser");
    }

    @Test
    @DisplayName("US1-AC3: 잘못된 비밀번호로 로그인하면 인증 실패 응답을 받는다")
    void loginWithWrongPassword_ThrowsException() {
        // Given: 사용자는 존재하지만 비밀번호가 틀림
        when(userMapper.findByUsername("testuser")).thenReturn(testUser);
        when(passwordEncoder.matches("wrongpassword", testUser.getPassword())).thenReturn(false);

        LoginRequest wrongPasswordRequest = LoginRequest.builder()
                .username("testuser")
                .password("wrongpassword")
                .build();

        // When & Then: 인증 실패 예외가 발생함
        assertThatThrownBy(() -> authService.login(wrongPasswordRequest, "127.0.0.1", "TestAgent"))
                .isInstanceOf(AuthenticationException.class)
                .hasMessage("Invalid username or password");

        // 로그인 실패 기록 확인
        verify(loginAttemptMapper, times(1)).insert(argThat(attempt ->
                attempt.getUsername().equals("testuser") &&
                Boolean.FALSE.equals(attempt.getSuccess())
        ));

        // 토큰은 생성되지 않음
        verify(jwtTokenProvider, never()).generateToken(anyString(), any());
    }

    @Test
    @DisplayName("US1-AC4: 존재하지 않는 사용자 아이디로 로그인하면 인증 실패 응답을 받는다")
    void loginWithNonExistentUser_ThrowsException() {
        // Given: 존재하지 않는 사용자
        when(userMapper.findByUsername("nonexistent")).thenReturn(null);

        LoginRequest nonExistentRequest = LoginRequest.builder()
                .username("nonexistent")
                .password("password123")
                .build();

        // When & Then: 인증 실패 예외가 발생함
        assertThatThrownBy(() -> authService.login(nonExistentRequest, "127.0.0.1", "TestAgent"))
                .isInstanceOf(AuthenticationException.class)
                .hasMessage("Invalid username or password");

        // 로그인 실패 기록 확인
        verify(loginAttemptMapper, times(1)).insert(argThat(attempt ->
                attempt.getUsername().equals("nonexistent") &&
                Boolean.FALSE.equals(attempt.getSuccess())
        ));
    }

    @Test
    @DisplayName("Edge Case: 5회 로그인 실패 시 계정이 차단된다")
    void rateLimitExceeded_ThrowsRateLimitException() {
        // Given: 이미 5회 실패하여 차단된 상태
        doThrow(new RateLimitException("Too many failed login attempts", 300L))
                .when(loginAttemptService).checkRateLimit("testuser");

        // When & Then: Rate Limit 예외가 발생함
        assertThatThrownBy(() -> authService.login(loginRequest, "127.0.0.1", "TestAgent"))
                .isInstanceOf(RateLimitException.class)
                .hasMessageContaining("Too many failed login attempts");

        // 사용자 조회도 하지 않음
        verify(userMapper, never()).findByUsername(anyString());
    }

    @Test
    @DisplayName("보안: 인증 실패 시 아이디 없음과 비밀번호 틀림을 구분하지 않는다")
    void securityCheck_SameErrorMessageForDifferentFailures() {
        // Given: 존재하지 않는 사용자
        when(userMapper.findByUsername("nonexistent")).thenReturn(null);

        LoginRequest request1 = LoginRequest.builder()
                .username("nonexistent")
                .password("password123")
                .build();

        // Given: 존재하지만 비밀번호 틀림
        when(userMapper.findByUsername("testuser")).thenReturn(testUser);
        when(passwordEncoder.matches("wrongpassword", testUser.getPassword())).thenReturn(false);

        LoginRequest request2 = LoginRequest.builder()
                .username("testuser")
                .password("wrongpassword")
                .build();

        // When & Then: 두 경우 모두 동일한 에러 메시지
        assertThatThrownBy(() -> authService.login(request1, "127.0.0.1", "TestAgent"))
                .isInstanceOf(AuthenticationException.class)
                .hasMessage("Invalid username or password");

        assertThatThrownBy(() -> authService.login(request2, "127.0.0.1", "TestAgent"))
                .isInstanceOf(AuthenticationException.class)
                .hasMessage("Invalid username or password");
    }
}
