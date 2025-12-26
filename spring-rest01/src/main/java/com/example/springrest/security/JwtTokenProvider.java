package com.example.springrest.security;

import com.example.springrest.config.JwtProperties;
import com.example.springrest.exception.InvalidTokenException;
import com.example.springrest.model.enums.UserRole;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * JWT 토큰 생성/검증 유틸리티
 * HS256 알고리즘 사용, 30분 만료
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    
    private final JwtProperties jwtProperties;
    private SecretKey key;

    /**
     * SecretKey 초기화 (지연 초기화)
     */
    private SecretKey getKey() {
        if (key == null) {
            key = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8));
        }
        return key;
    }

    /**
     * JWT 토큰 생성
     * @param username 사용자명
     * @param role 사용자 역할
     * @return JWT 토큰 문자열
     */
    public String generateToken(String username, UserRole role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtProperties.getExpiration());

        return Jwts.builder()
                .subject(username)
                .claim("role", role.name())
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getKey(), Jwts.SIG.HS256)
                .compact();
    }

    /**
     * JWT 토큰에서 사용자명 추출
     * @param token JWT 토큰
     * @return 사용자명
     */
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    /**
     * JWT 토큰에서 역할 추출
     * @param token JWT 토큰
     * @return 사용자 역할
     */
    public UserRole extractRole(String token) {
        String roleName = getClaims(token).get("role", String.class);
        return UserRole.valueOf(roleName);
    }

    /**
     * JWT 토큰 유효성 검증
     * @param token JWT 토큰
     * @return 유효하면 true
     * @throws InvalidTokenException 토큰 형식이 잘못되었거나 서명이 유효하지 않을 때
     * @throws ExpiredJwtException 토큰이 만료되었을 때
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.warn("JWT token expired: {}", e.getMessage());
            throw e;
        } catch (MalformedJwtException e) {
            log.warn("Malformed JWT token: {}", e.getMessage());
            throw new InvalidTokenException("Malformed JWT token", e);
        } catch (SignatureException e) {
            log.warn("Invalid JWT signature: {}", e.getMessage());
            throw new InvalidTokenException("Invalid JWT signature", e);
        } catch (JwtException e) {
            log.warn("JWT token invalid: {}", e.getMessage());
            throw new InvalidTokenException("Invalid JWT token", e);
        }
    }

    /**
     * JWT 토큰에서 Claims 추출
     * @param token JWT 토큰
     * @return Claims
     */
    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    
    /**
     * JWT 토큰의 만료 시간(밀리초) 반환
     * @return 만료 시간 (밀리초)
     */
    public Long getExpirationMs() {
        return jwtProperties.getExpiration();
    }
}
