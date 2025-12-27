package com.example.springrest.model.dto.user;

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
    private String roleId;
    private List<String> menuIds;
}
