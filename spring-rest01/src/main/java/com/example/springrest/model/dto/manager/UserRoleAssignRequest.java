package com.example.springrest.model.dto.manager;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 관리자에게 역할 부여 요청 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleAssignRequest {
    private String userId;
    private List<String> roleIds;
}
