package com.example.springrest.service;

import com.example.springrest.model.dto.TokenValidationResponse;
import com.example.springrest.model.dto.UserInfoResponse;
import com.example.springrest.model.entity.User;
import com.example.springrest.model.enums.UserRole;
import com.example.springrest.repository.UserMapper;
import com.example.springrest.security.JwtTokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

/**
 * AuthService User Story 3 테스트
 * 현재 사용자 정보 조회 및 토큰 검증 기능 테스트
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService - User Story 3 Tests")
class AuthServiceUserStory3Test {

    @Mock
    private UserMapper userMapper;
    
    @Mock
    private JwtTokenProvider jwtTokenProvider;
    
    @InjectMocks
    private AuthService authService;

    @Test
    @DisplayName("getCurrentUser - 사용자 정보를 성공적으로 조회한다")
    void getCurrentUser_Success() {
        // given
        String username = "testuser";
        User user = User.builder()
                .id(1L)
                .username(username)
                .email("test@example.com")
                .role(UserRole.USER)
                .createdAt(LocalDateTime.now())
                .lastLoginAt(LocalDateTime.now())
                .build();
        
        given(userMapper.findByUsername(username)).willReturn(user);
        
        // when
        UserInfoResponse response = authService.getCurrentUser(username);
        
        // then
        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getUsername()).isEqualTo(username);
        assertThat(response.getEmail()).isEqualTo("test@example.com");
        assertThat(response.getRole()).isEqualTo(UserRole.USER);
        assertThat(response.getCreatedAt()).isNotNull();
        assertThat(response.getLastLoginAt()).isNotNull();
        
        verify(userMapper).findByUsername(username);
    }

    @Test
    @DisplayName("getCurrentUser - 존재하지 않는 사용자는 예외를 발생시킨다")
    void getCurrentUser_UserNotFound() {
        // given
        String username = "nonexistent";
        given(userMapper.findByUsername(username)).willReturn(null);
        
        // when & then
        assertThatThrownBy(() -> authService.getCurrentUser(username))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("User not found");
        
        verify(userMapper).findByUsername(username);
    }

    @Test
    @DisplayName("validateToken - 유효한 토큰을 검증한다")
    void validateToken_ValidToken() {
        // given
        String token = "valid.jwt.token";
        String username = "testuser";
        UserRole role = UserRole.USER;
        
        given(jwtTokenProvider.validateToken(token)).willReturn(true);
        given(jwtTokenProvider.extractUsername(token)).willReturn(username);
        given(jwtTokenProvider.extractRole(token)).willReturn(role);
        
        // when
        TokenValidationResponse response = authService.validateToken(token);
        
        // then
        assertThat(response).isNotNull();
        assertThat(response.isValid()).isTrue();
        assertThat(response.getUsername()).isEqualTo(username);
        assertThat(response.getRole()).isEqualTo(role);
        assertThat(response.getMessage()).isEqualTo("Token is valid");
        
        verify(jwtTokenProvider).validateToken(token);
        verify(jwtTokenProvider).extractUsername(token);
        verify(jwtTokenProvider).extractRole(token);
    }

    @Test
    @DisplayName("validateToken - 유효하지 않은 토큰은 invalid 응답을 반환한다")
    void validateToken_InvalidToken() {
        // given
        String token = "invalid.jwt.token";
        given(jwtTokenProvider.validateToken(token)).willReturn(false);
        
        // when
        TokenValidationResponse response = authService.validateToken(token);
        
        // then
        assertThat(response).isNotNull();
        assertThat(response.isValid()).isFalse();
        assertThat(response.getMessage()).isEqualTo("Invalid token");
        assertThat(response.getUsername()).isNull();
        assertThat(response.getRole()).isNull();
        
        verify(jwtTokenProvider).validateToken(token);
    }

    @Test
    @DisplayName("validateToken - 만료된 토큰은 JwtException을 처리한다")
    void validateToken_ExpiredToken() {
        // given
        String token = "expired.jwt.token";
        given(jwtTokenProvider.validateToken(token))
                .willThrow(new ExpiredJwtException(null, null, "Token expired"));
        
        // when
        TokenValidationResponse response = authService.validateToken(token);
        
        // then
        assertThat(response).isNotNull();
        assertThat(response.isValid()).isFalse();
        assertThat(response.getMessage()).contains("Token expired");
        
        verify(jwtTokenProvider).validateToken(token);
    }

    @Test
    @DisplayName("validateToken - JwtException 발생 시 적절히 처리한다")
    void validateToken_JwtException() {
        // given
        String token = "malformed.jwt.token";
        given(jwtTokenProvider.validateToken(token))
                .willThrow(new JwtException("Malformed token"));
        
        // when
        TokenValidationResponse response = authService.validateToken(token);
        
        // then
        assertThat(response).isNotNull();
        assertThat(response.isValid()).isFalse();
        assertThat(response.getMessage()).contains("Malformed token");
        
        verify(jwtTokenProvider).validateToken(token);
    }
}
