package com.example.springrest.global.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT 인증 필터
 * Authorization 헤더에서 JWT 토큰을 추출하고 검증하여 SecurityContext에 인증 정보 설정
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = extractJwtFromRequest(request);

            if (StringUtils.hasText(jwt) && jwtTokenProvider.validateToken(jwt)) {
                String username = jwtTokenProvider.extractUsername(jwt);

                // UserDetails 생성 (간소화된 버전 - 실제로는 DB 조회 필요)
                UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                        .username(username)
                        .password("") // JWT 검증 후이므로 비밀번호 불필요
                        .authorities("ROLE_" + jwtTokenProvider.extractRole(jwt).name())
                        .build();

                // Spring Security 인증 객체 생성
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // SecurityContext에 인증 정보 설정
                SecurityContextHolder.getContext().setAuthentication(authentication);

                log.debug("JWT authentication successful for user: {}", username);
            }
        } catch (Exception e) {
            log.error("JWT authentication failed: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Authorization 헤더에서 JWT 토큰 추출
     * 
     * @param request HTTP 요청
     * @return JWT 토큰 (없으면 null)
     */
    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
