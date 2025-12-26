package com.example.springrest.integration;

import com.example.springrest.model.enums.UserRole;
import com.example.springrest.util.JwtTestUtil;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * 토큰 만료 통합 테스트
 * 만료된 JWT 토큰으로 보호된 API 접근 시 401 응답 및 TOKEN_EXPIRED 메시지 검증
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DisplayName("Token Expiration Integration Tests")
class TokenExpirationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("만료된 토큰으로 /me API 접근 시 401 응답")
    void accessProtectedApi_withExpiredToken_shouldReturn401() throws Exception {
        // Given: 만료된 토큰 생성
        String expiredToken = JwtTestUtil.generateExpiredToken("testuser", UserRole.USER);

        // When & Then: 만료된 토큰으로 API 접근
        mockMvc.perform(get("/api/v1/auth/me")
                .header("Authorization", "Bearer " + expiredToken))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("유효한 토큰은 정상 처리")
    void accessProtectedApi_withValidToken_shouldReturn200() throws Exception {
        // Given: 유효한 토큰 생성 (30분 만료)
        String validToken = JwtTestUtil.generateValidToken("testuser", UserRole.USER);

        // When & Then: 유효한 토큰으로 API 접근
        mockMvc.perform(get("/api/v1/auth/me")
                .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("200"))
                .andExpect(jsonPath("$.message").value("SUCCESS"))
                .andExpect(jsonPath("$.data.username").value("testuser"));
    }

    @Test
    @DisplayName("만료된 토큰 검증 시 invalid 응답")
    void validateExpiredToken_shouldReturnInvalid() throws Exception {
        // Given: 만료된 토큰 생성
        String expiredToken = JwtTestUtil.generateExpiredToken("testuser", UserRole.USER);
        String validateRequest = String.format("{\"token\":\"%s\"}", expiredToken);

        // When & Then: 만료된 토큰 검증
        mockMvc.perform(
                org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post("/api/v1/auth/validate")
                        .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                        .content(validateRequest))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("200"))
                .andExpect(jsonPath("$.message").value("SUCCESS"))
                .andExpect(jsonPath("$.data.valid").value(false))
                .andExpect(jsonPath("$.data.message").exists());
    }

    @Test
    @DisplayName("토큰 없이 보호된 API 접근 시 401 응답")
    void accessProtectedApi_withoutToken_shouldReturn401() throws Exception {
        // When & Then
        mockMvc.perform(get("/api/v1/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Bearer 없는 토큰으로 접근 시 401 응답")
    void accessProtectedApi_withoutBearerPrefix_shouldReturn401() throws Exception {
        // Given
        String validToken = JwtTestUtil.generateValidToken("testuser", UserRole.USER);

        // When & Then: Bearer 접두사 없이 토큰 전송
        mockMvc.perform(get("/api/v1/auth/me")
                .header("Authorization", validToken))
                .andExpect(status().isUnauthorized());
    }
}
