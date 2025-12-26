package com.example.springrest.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 로그인 시도 기록 엔티티
 * Rate limiting을 위한 로그인 실패 이력 저장
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginAttempt {
    private Long id;
    private String username;
    private LocalDateTime attemptTime;
    private Boolean success;
    private String ipAddress;
    private String userAgent;
    private LocalDateTime createdAt;
}
