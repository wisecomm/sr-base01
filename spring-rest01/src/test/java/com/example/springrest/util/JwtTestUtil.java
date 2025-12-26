package com.example.springrest.util;

import com.example.springrest.config.JwtProperties;
import com.example.springrest.model.enums.UserRole;
import com.example.springrest.security.JwtTokenProvider;

/**
 * JWT 테스트 유틸리티
 * 테스트용 토큰 생성 헬퍼 메서드 제공
 */
public class JwtTestUtil {

    // application-test.yml의 jwt.secret과 동일해야 함
    private static final String TEST_SECRET = "testSecretKeyForTestingPurposesOnlyMustBe256BitsOrMoreForHS256Algorithm";

    /**
     * 만료된 JWT 토큰 생성 (테스트용)
     */
    public static String generateExpiredToken(String username, UserRole role) {
        JwtProperties properties = new JwtProperties();
        properties.setSecret(TEST_SECRET);
        properties.setExpiration(1L); // 1ms로 즉시 만료

        JwtTokenProvider provider = new JwtTokenProvider(properties);
        String token = provider.generateToken(username, role);

        // 토큰이 만료되도록 잠시 대기
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        return token;
    }

    /**
     * 유효한 JWT 토큰 생성 (테스트용)
     */
    public static String generateValidToken(String username, UserRole role) {
        JwtProperties properties = new JwtProperties();
        properties.setSecret(TEST_SECRET);
        properties.setExpiration(1800000L); // 30분

        JwtTokenProvider provider = new JwtTokenProvider(properties);
        return provider.generateToken(username, role);
    }

    /**
     * 테스트용 JwtTokenProvider 생성
     */
    public static JwtTokenProvider createTestJwtTokenProvider() {
        JwtProperties properties = new JwtProperties();
        properties.setSecret(TEST_SECRET);
        properties.setExpiration(1800000L);

        return new JwtTokenProvider(properties);
    }
}
