package com.example.springrest.domain.auth.controller;

import com.example.springrest.global.model.dto.ApiResponse;
import com.example.springrest.domain.auth.model.LoginRequest;
import com.example.springrest.domain.auth.model.LoginResponse;
import com.example.springrest.domain.auth.model.TokenRefreshRequest;
import com.example.springrest.domain.auth.model.TokenValidationRequest;
import com.example.springrest.domain.auth.model.TokenValidationResponse;
import com.example.springrest.domain.user.model.dto.UserInfoResponse;
import com.example.springrest.domain.auth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * 인증 컨트롤러
 * 로그인, 토큰 검증 등 인증 관련 API 엔드포인트 제공
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * 로그인 API
     * 
     * @param request     로그인 요청 (username, password)
     * @param httpRequest HTTP 요청 (IP, User-Agent 추출용)
     * @return 로그인 응답 (JWT 토큰, 사용자 정보)
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest) {

        String ipAddress = getClientIpAddress(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");

        log.info("Login attempt for user: {} from IP: {}", request.getUserId(), ipAddress);

        LoginResponse response = authService.login(request, ipAddress, userAgent);

        log.info("Login successful for user: {}", request.getUserId());

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 토큰 갱신 API
     * 
     * @param request 토큰 갱신 요청 (refreshToken)
     * @return 새로운 토큰 정보
     */
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<LoginResponse>> refresh(
            @Valid @RequestBody TokenRefreshRequest request) {

        log.info("Refresh token request");

        LoginResponse response = authService.refreshToken(request.getRefreshToken());

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 클라이언트 IP 주소 추출
     * X-Forwarded-For 헤더 우선 확인 (프록시 환경 대응)
     * 
     * @param request HTTP 요청
     * @return IP 주소
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    /**
     * 현재 사용자 정보 조회 API
     * 
     * @return 인증된 사용자 정보
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserInfoResponse>> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        log.info("Get current user info: {}", userId);

        UserInfoResponse response = authService.getCurrentUser(userId);

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 토큰 검증 API
     * 
     * @param request 토큰 검증 요청
     * @return 토큰 검증 결과
     */
    @PostMapping("/validate")
    public ResponseEntity<ApiResponse<TokenValidationResponse>> validateToken(
            @Valid @RequestBody TokenValidationRequest request) {

        log.info("Validate token request");

        TokenValidationResponse response = authService.validateToken(request.getToken());

        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
