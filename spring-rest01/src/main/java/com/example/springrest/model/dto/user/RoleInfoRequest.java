package com.example.springrest.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 역할 정보 요청 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleInfoRequest {
    private String roleId;
    private String roleName;
    private String roleDesc;
    private LocalDateTime roleStartDt;
    private LocalDateTime roleEndDt;
    private String useYn;
}
