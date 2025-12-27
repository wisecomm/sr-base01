package com.example.springrest.domain.auth.service;

import com.example.springrest.domain.auth.model.LoginRequest;
import com.example.springrest.domain.auth.model.LoginResponse;
import com.example.springrest.domain.auth.model.TokenValidationResponse;
import com.example.springrest.domain.user.model.dto.UserInfoResponse;
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
        String username = request.getUsername();

        // 사용자 조회 (USER_ID를 username으로 사용)
        UserInfo user = userInfoMapper.findById(username);
        if (user == null) {
            throw new AuthenticationException("Invalid username or password");
        }

        // 비밀번호 검증
        if (!passwordEncoder.matches(request.getPassword(), user.getUserPwd())) {
            throw new AuthenticationException("Invalid username or password");
        }

        // JWT 토큰 생성 (기본적으로 ADMIN 역할 부여 또는 매핑 테이블에서 가져와야 함)
        // 일단은 기본 ADMIN 역할 부여 (하드코딩된 부분은 나중에 매핑 테이블 연동 필요)
        UserRole role = UserRole.ADMIN;

        String token = jwtTokenProvider.generateToken(user.getUserId(), role);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getUserId());
        Long expiresIn = jwtTokenProvider.getExpirationMs();

        // 응답 생성
        UserInfoResponse userInfo = convertToUserInfoResponse(user, role);

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
        UserInfo user = userInfoMapper.findById(username);
        if (user == null) {
            throw new JwtException("User not found");
        }

        // 역할 정보 추출 (토큰에서 가져오거나 DB 재조회)
        UserRole role = UserRole.ADMIN;

        // 새로운 토큰 생성
        String newToken = jwtTokenProvider.generateToken(user.getUserId(), role);
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(user.getUserId());
        Long expiresIn = jwtTokenProvider.getExpirationMs();

        // 사용자 정보 생성
        UserInfoResponse userInfo = convertToUserInfoResponse(user, role);

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
     * 현재 인증된 사용자 정보 조회
     * 
     * @param username 사용자명 (JWT에서 추출)
     * @return 사용자 정보
     * @throws IllegalArgumentException 사용자를 찾을 수 없을 때
     */
    public UserInfoResponse getCurrentUser(String username) {
        UserInfo user = userInfoMapper.findById(username);
        if (user == null) {
            throw new IllegalArgumentException("User not found: " + username);
        }

        return convertToUserInfoResponse(user, UserRole.ADMIN);
    }

    private UserInfoResponse convertToUserInfoResponse(UserInfo user, UserRole role) {
        return UserInfoResponse.builder()
                .username(user.getUserId())
                .email(user.getUserEmail())
                .role(role)
                .userId(user.getUserId())
                .userEmail(user.getUserEmail())
                .userMobile(user.getUserMobile())
                .userName(user.getUserName())
                .userNick(user.getUserNick())
                .userMsg(user.getUserMsg())
                .userDesc(user.getUserDesc())
                .userStatCd(user.getUserStatCd())
                .userSnsid(user.getUserSnsid())
                .useYn(user.getUseYn())
                .accountNonLock(user.getAccountNonLock())
                .passwordLockCnt(user.getPasswordLockCnt())
                .accountStartDt(user.getAccountStartDt())
                .accountEndDt(user.getAccountEndDt())
                .passwordExpireDt(user.getPasswordExpireDt())
                .mdmYn(user.getMdmYn())
                .sysInsertDtm(user.getSysInsertDtm())
                .sysUpdateDtm(user.getSysUpdateDtm())
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
            UserRole role = jwtTokenProvider.extractRole(token);

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
