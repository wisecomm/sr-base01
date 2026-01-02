package com.example.springrest.domain.role.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 역할에 메뉴 부여 요청 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleMenuAssignRequest {
    @NotBlank(message = "역할 ID는 필수입니다")
    private String roleId;

    @NotNull(message = "메뉴 ID 목록은 필수입니다")
    private List<String> menuIds;
}
