package com.example.springrest.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 사용자에게 역할 부여 요청 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleAssignRequest {
    private String userId;
    private List<String> roleIds;
}
