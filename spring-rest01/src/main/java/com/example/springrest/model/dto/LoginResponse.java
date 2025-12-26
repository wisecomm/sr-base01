package com.example.springrest.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 로그인 응답 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;         // JWT 토큰
    private String tokenType;     // "Bearer"
    private Long expiresIn;       // 만료 시간 (초 단위, 1800)
    private UserInfoResponse user; // 사용자 기본 정보
}
