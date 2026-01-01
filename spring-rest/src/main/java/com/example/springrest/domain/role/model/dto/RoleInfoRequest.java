package com.example.springrest.domain.role.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String useYn;
}
