package com.example.springrest.domain.role.model.dto;

import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "역할 ID는 필수입니다")
    private String roleId;

    @NotBlank(message = "역할 이름은 필수입니다")
    private String roleName;

    private String roleDesc;

    @NotBlank(message = "사용 여부는 필수입니다")
    private String useYn;
}
