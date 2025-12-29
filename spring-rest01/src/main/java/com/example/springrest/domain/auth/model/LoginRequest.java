package com.example.springrest.domain.auth.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 로그인 요청 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @NotBlank(message = "User ID is required")
    @Size(min = 3, max = 50, message = "User ID must be 3-50 characters")
    private String userId;

    @NotBlank(message = "Password is required")
    @Size(min = 4, max = 100, message = "Password must be 4-100 characters")
    private String userPwd;
}
