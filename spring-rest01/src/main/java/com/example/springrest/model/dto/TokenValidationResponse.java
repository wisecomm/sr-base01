package com.example.springrest.model.dto;

import com.example.springrest.model.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 토큰 검증 응답 DTO
 * POST /api/v1/auth/validate 엔드포인트에서 반환
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenValidationResponse {
    
    private boolean valid;
    private String username;
    private UserRole role;
    private String message;
    
    /**
     * 유효한 토큰에 대한 응답 생성
     */
    public static TokenValidationResponse valid(String username, UserRole role) {
        return TokenValidationResponse.builder()
                .valid(true)
                .username(username)
                .role(role)
                .message("Token is valid")
                .build();
    }
    
    /**
     * 유효하지 않은 토큰에 대한 응답 생성
     */
    public static TokenValidationResponse invalid(String message) {
        return TokenValidationResponse.builder()
                .valid(false)
                .message(message)
                .build();
    }
}
