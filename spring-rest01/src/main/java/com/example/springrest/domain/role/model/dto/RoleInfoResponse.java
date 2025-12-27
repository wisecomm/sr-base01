package com.example.springrest.domain.role.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 역할 정보 응답 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleInfoResponse {
    private String roleId;
    private String roleName;
    private String roleDesc;
    private LocalDateTime roleStartDt;
    private LocalDateTime roleEndDt;
    private String useYn;
    private LocalDateTime sysInsertDtm;
    private LocalDateTime sysUpdateDtm;
}
