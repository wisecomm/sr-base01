package com.example.springrest.service;

import com.example.springrest.model.dto.LoginRequest;
import com.example.springrest.model.dto.LoginResponse;
import com.example.springrest.model.dto.TokenValidationResponse;
import com.example.springrest.model.dto.UserInfoResponse;
import com.example.springrest.model.entity.LoginAttempt;
import com.example.springrest.model.entity.User;
import com.example.springrest.repository.LoginAttemptMapper;
import com.example.springrest.repository.UserMapper;
import com.example.springrest.security.JwtTokenProvider;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * 인증 서비스
 * 로그인, 토큰 생성 등 인증 관련 비즈니스 로직 처리
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserMapper userMapper;
    private final LoginAttemptMapper loginAttemptMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final LoginAttemptService loginAttemptService;

    /**
     * 사용자 로그인
     * 
     * @param request   로그인 요청 (username, password)
     * @param ipAddress 클라이언트 IP 주소
     * @param userAgent User-Agent 헤더
     * @return 로그인 응답 (JWT 토큰, 사용자 정보)
     * @throws IllegalArgumentException 인증 실패 시
     * @throws RateLimitException       Rate Limit 초과 시
     */
    @Transactional
    public LoginResponse login(LoginRequest request, String ipAddress, String userAgent) {
        String username = request.getUsername();

        // Rate Limit 체크 (5분간 5회 실패 시 차단)
        loginAttemptService.checkRateLimit(username);

        // 사용자 조회
        User user = userMapper.findByUsername(username);
        if (user == null) {
            recordLoginAttempt(username, false, ipAddress, userAgent);
            throw new com.example.springrest.exception.AuthenticationException("Invalid username or password");
        }

        // 비밀번호 검증
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            recordLoginAttempt(username, false, ipAddress, userAgent);
            throw new com.example.springrest.exception.AuthenticationException("Invalid username or password");
        }
        /*
         * // 로그인 성공 기록
         * recordLoginAttempt(username, true, ipAddress, userAgent);
         * 
         * // 차단 캐시 초기화
         * loginAttemptService.clearLoginAttempts(username);
         * 
         * // 마지막 로그인 시각 업데이트
         * LocalDateTime now = LocalDateTime.now();
         * userMapper.updateLastLoginAt(username, now);
         */
        // JWT 토큰 생성
        String token = jwtTokenProvider.generateToken(user.getUsername(), user.getRole());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getUsername());
        Long expiresIn = jwtTokenProvider.getExpirationMs();

        // 응답 생성
        UserInfoResponse userInfo = UserInfoResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                // .lastLoginAt(now)
                .build();

        log.info("User {} logged in successfully", username);

        return LoginResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(expiresIn)
                .user(userInfo)
                .build();
    }

    /**
     * 토큰 갱신
     * 
     * @param refreshToken 리프래쉬 토큰
     * @return 새로운 로그인 응답
     * @throws JwtException 토큰이 유효하지 않을 때
     */
    @Transactional
    public LoginResponse refreshToken(String refreshToken) {
        // 리프래쉬 토큰 검증
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new JwtException("Invalid refresh token");
        }

        // 사용자명 추출
        String username = jwtTokenProvider.extractUsername(refreshToken);

        // 사용자 조회
        User user = userMapper.findByUsername(username);
        if (user == null) {
            throw new JwtException("User not found");
        }

        // 새로운 토큰 생성
        String newToken = jwtTokenProvider.generateToken(user.getUsername(), user.getRole());
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(user.getUsername());
        Long expiresIn = jwtTokenProvider.getExpirationMs();

        // 사용자 정보 생성
        UserInfoResponse userInfo = UserInfoResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .lastLoginAt(user.getLastLoginAt())
                .build();

        log.info("Token refreshed for user: {}", username);

        return LoginResponse.builder()
                .token(newToken)
                .refreshToken(newRefreshToken)
                .tokenType("Bearer")
                .expiresIn(expiresIn)
                .user(userInfo)
                .build();
    }

    /**
     * 로그인 시도 기록
     * 
     * @param username  사용자명
     * @param success   성공 여부
     * @param ipAddress IP 주소
     * @param userAgent User-Agent
     */
    private void recordLoginAttempt(String username, boolean success, String ipAddress, String userAgent) {
        LoginAttempt attempt = LoginAttempt.builder()
                .username(username)
                .attemptTime(LocalDateTime.now())
                .success(success)
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .createdAt(LocalDateTime.now())
                .build();

        loginAttemptMapper.insert(attempt);
    }

    /**
     * 현재 인증된 사용자 정보 조회
     * 
     * @param username 사용자명 (JWT에서 추출)
     * @return 사용자 정보
     * @throws IllegalArgumentException 사용자를 찾을 수 없을 때
     */
    public UserInfoResponse getCurrentUser(String username) {
        User user = userMapper.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User not found: " + username);
        }

        return UserInfoResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .lastLoginAt(user.getLastLoginAt())
                .build();
    }

    /**
     * JWT 토큰 검증
     * 
     * @param token JWT 토큰
     * @return 검증 결과 (유효 여부, 사용자 정보)
     */
    public TokenValidationResponse validateToken(String token) {
        try {
            // 토큰 유효성 검증
            if (!jwtTokenProvider.validateToken(token)) {
                return TokenValidationResponse.invalid("Invalid token");
            }

            // 사용자명과 역할 추출
            String username = jwtTokenProvider.extractUsername(token);
            com.example.springrest.model.enums.UserRole role = jwtTokenProvider.extractRole(token);

            return TokenValidationResponse.valid(username, role);

        } catch (JwtException e) {
            log.warn("Token validation failed: {}", e.getMessage());
            return TokenValidationResponse.invalid(e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error during token validation", e);
            return TokenValidationResponse.invalid("Token validation failed");
        }
    }
}
