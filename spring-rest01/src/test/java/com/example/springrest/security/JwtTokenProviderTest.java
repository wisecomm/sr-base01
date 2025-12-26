package com.example.springrest.security;

import com.example.springrest.config.JwtProperties;
import com.example.springrest.model.enums.UserRole;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

/**
 * JwtTokenProvider 단위 테스트
 * Spec: User Story 2 - 토큰 만료 처리, User Story 3 - 토큰 정보 조회
 */
@DisplayName("JwtTokenProvider 단위 테스트")
class JwtTokenProviderTest {

    private JwtTokenProvider jwtTokenProvider;
    private JwtProperties jwtProperties;

    @BeforeEach
    void setUp() {
        jwtProperties = new JwtProperties();
        jwtProperties.setSecret("test-secret-key-for-jwt-token-generation-must-be-at-least-256-bits");
        jwtProperties.setExpiration(1800000L); // 30분
        
        jwtTokenProvider = new JwtTokenProvider(jwtProperties);
    }

    @Test
    @DisplayName("US3-AC1: JWT 토큰 생성 시 사용자 정보가 포함된다")
    void generateToken_ContainsUserInfo() {
        // Given: 사용자 정보
        String username = "testuser";
        UserRole role = UserRole.USER;

        // When: 토큰 생성
        String token = jwtTokenProvider.generateToken(username, role);

        // Then: 토큰이 생성되고 사용자 정보 추출 가능
        assertThat(token).isNotNull().isNotEmpty();
        assertThat(jwtTokenProvider.extractUsername(token)).isEqualTo(username);
        assertThat(jwtTokenProvider.extractRole(token)).isEqualTo(role);
    }

    @Test
    @DisplayName("US3-AC1: JWT 토큰에서 사용자 ID를 추출할 수 있다")
    void extractUsername_ReturnsCorrectUsername() {
        // Given: 유효한 토큰
        String token = jwtTokenProvider.generateToken("testuser", UserRole.USER);

        // When: username 추출
        String username = jwtTokenProvider.extractUsername(token);

        // Then: 올바른 username 반환
        assertThat(username).isEqualTo("testuser");
    }

    @Test
    @DisplayName("US3-AC1: JWT 토큰에서 권한 정보를 추출할 수 있다")
    void extractRole_ReturnsCorrectRole() {
        // Given: ADMIN 권한의 토큰
        String token = jwtTokenProvider.generateToken("admin", UserRole.ADMIN);

        // When: role 추출
        UserRole role = jwtTokenProvider.extractRole(token);

        // Then: 올바른 role 반환
        assertThat(role).isEqualTo(UserRole.ADMIN);
    }

    @Test
    @DisplayName("US2-AC1: 유효한 토큰은 검증을 통과한다")
    void validateToken_WithValidToken_ReturnsTrue() {
        // Given: 유효한 토큰
        String token = jwtTokenProvider.generateToken("testuser", UserRole.USER);

        // When & Then: 검증 성공
        assertThat(jwtTokenProvider.validateToken(token)).isTrue();
    }

    @Test
    @DisplayName("US3-AC3: 잘못된 형식의 토큰은 검증 실패한다")
    void validateToken_WithMalformedToken_ThrowsInvalidTokenException() {
        // Given: 잘못된 형식의 토큰
        String malformedToken = "invalid.jwt.token";

        // When & Then: InvalidTokenException 발생
        assertThatThrownBy(() -> jwtTokenProvider.validateToken(malformedToken))
                .isInstanceOf(com.example.springrest.exception.InvalidTokenException.class);
    }

    @Test
    @DisplayName("US3-AC3: 잘못된 토큰에서 정보 추출 시 예외 발생")
    void extractUsername_WithMalformedToken_ThrowsException() {
        // Given: 잘못된 형식의 토큰
        String malformedToken = "invalid.jwt.token";

        // When & Then: MalformedJwtException 발생
        assertThatThrownBy(() -> jwtTokenProvider.extractUsername(malformedToken))
                .isInstanceOf(MalformedJwtException.class);
    }

    @Test
    @DisplayName("US2-AC2: 만료된 토큰은 검증 실패한다")
    void validateToken_WithExpiredToken_ThrowsException() throws InterruptedException {
        // Given: 만료 시간이 1ms인 토큰
        JwtProperties shortExpirationProps = new JwtProperties();
        shortExpirationProps.setSecret("test-secret-key-for-jwt-token-generation-must-be-at-least-256-bits");
        shortExpirationProps.setExpiration(1L); // 1ms
        
        JwtTokenProvider shortExpirationProvider = new JwtTokenProvider(shortExpirationProps);
        String token = shortExpirationProvider.generateToken("testuser", UserRole.USER);

        // When: 토큰 만료 대기
        Thread.sleep(100);

        // Then: ExpiredJwtException 발생
        assertThatThrownBy(() -> shortExpirationProvider.validateToken(token))
                .isInstanceOf(ExpiredJwtException.class);
    }

    @Test
    @DisplayName("US3-AC2: 만료된 토큰에서 정보 추출 시 ExpiredJwtException 발생")
    void extractUsername_WithExpiredToken_ThrowsExpiredException() throws InterruptedException {
        // Given: 만료된 토큰
        JwtProperties shortExpirationProps = new JwtProperties();
        shortExpirationProps.setSecret("test-secret-key-for-jwt-token-generation-must-be-at-least-256-bits");
        shortExpirationProps.setExpiration(1L);
        
        JwtTokenProvider shortExpirationProvider = new JwtTokenProvider(shortExpirationProps);
        String token = shortExpirationProvider.generateToken("testuser", UserRole.USER);

        Thread.sleep(10);

        // When & Then: ExpiredJwtException 발생
        assertThatThrownBy(() -> shortExpirationProvider.extractUsername(token))
                .isInstanceOf(ExpiredJwtException.class);
    }

    @Test
    @DisplayName("토큰 만료 시간이 30분(1800000ms)으로 설정된다")
    void getExpirationMs_Returns30Minutes() {
        // When & Then: 30분 반환
        assertThat(jwtTokenProvider.getExpirationMs()).isEqualTo(1800000L);
    }

    @Test
    @DisplayName("동일한 사용자 정보로 생성한 토큰은 매번 다르다 (보안)")
    void generateToken_CreatesUniqueTokens() throws InterruptedException {
        // Given: 동일한 사용자 정보
        String username = "testuser";
        UserRole role = UserRole.USER;

        // When: 두 번 토큰 생성 (시간 차이를 위해 sleep)
        String token1 = jwtTokenProvider.generateToken(username, role);
        Thread.sleep(1000); // 1초 대기하여 issuedAt 차이 확보
        String token2 = jwtTokenProvider.generateToken(username, role);

        // Then: 토큰이 다름 (발급 시간이 달라서)
        assertThat(token1).isNotEqualTo(token2);
    }
}
