package com.example.springrest.domain.auth.service;

import com.example.springrest.domain.auth.model.LoginRequest;
import com.example.springrest.domain.auth.model.LoginResponse;
import com.example.springrest.domain.auth.model.TokenValidationResponse;
import com.example.springrest.domain.user.model.entity.UserInfo;
import com.example.springrest.domain.user.repository.UserInfoMapper;
import com.example.springrest.domain.user.model.enums.UserRole;
import com.example.springrest.global.security.JwtTokenProvider;
import com.example.springrest.global.exception.AuthenticationException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 인증 서비스
 * 로그인, 토큰 생성 등 인증 관련 비즈니스 로직 처리
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserInfoMapper userInfoMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 사용자 로그인
     * 
     * @param request   로그인 요청 (username, password)
     * @param ipAddress 클라이언트 IP 주소
     * @param userAgent User-Agent 헤더
     * @return 로그인 응답 (JWT 토큰, 사용자 정보)
     * @throws IllegalArgumentException 인증 실패 시
     */
    @Transactional
    public LoginResponse login(LoginRequest request, String ipAddress, String userAgent) {
        String userId = request.getUserId();

        // 사용자 조회 (USER_ID 사용)
        UserInfo user = userInfoMapper.findById(userId);
        if (user == null) {
            throw new AuthenticationException("Invalid User ID or password");
        }

        // 비밀번호 검증
        if (!passwordEncoder.matches(request.getUserPwd(), user.getUserPwd())) {
            throw new AuthenticationException("Invalid User ID or password");
        }

        // JWT 토큰 생성 (매핑 테이블에서 가져온 역할 정보 사용)
        String token = jwtTokenProvider.generateToken(user.getUserId(), user.getRoles());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getUserId());
        Long expiresIn = jwtTokenProvider.getExpirationMs();

        log.info("User {} logged in successfully with roles: {}", userId, user.getRoles());

        return LoginResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(expiresIn)
                .user(user)
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

        // 사용자 아이디 추출
        String userId = jwtTokenProvider.extractUserId(refreshToken);

        // 사용자 조회
        UserInfo user = userInfoMapper.findById(userId);
        if (user == null) {
            throw new JwtException("User not found");
        }

        // 새로운 토큰 생성
        String newToken = jwtTokenProvider.generateToken(user.getUserId(), user.getRoles());
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(user.getUserId());
        Long expiresIn = jwtTokenProvider.getExpirationMs();

        log.info("Token refreshed for user: {}", userId);

        return LoginResponse.builder()
                .token(newToken)
                .refreshToken(newRefreshToken)
                .tokenType("Bearer")
                .expiresIn(expiresIn)
                .user(user)
                .build();
    }

    /**
     * 현재 인증된 사용자 정보 조회
     * 
     * @param username 사용자명 (JWT에서 추출)
     * @return 사용자 정보
     * @throws IllegalArgumentException 사용자를 찾을 수 없을 때
     */
    public UserInfo getCurrentUser(String userId) {
        UserInfo user = userInfoMapper.findById(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found: " + userId);
        }

        return user;
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

            // 사용자 아이디와 역할 추출
            String userId = jwtTokenProvider.extractUserId(token);
            java.util.List<UserRole> roles = jwtTokenProvider.extractRoles(token);

            return TokenValidationResponse.valid(userId, roles);

        } catch (JwtException e) {
            log.warn("Token validation failed: {}", e.getMessage());
            return TokenValidationResponse.invalid(e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error during token validation", e);
            return TokenValidationResponse.invalid("Token validation failed");
        }
    }
}
