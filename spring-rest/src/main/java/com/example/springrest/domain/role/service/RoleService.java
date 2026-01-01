package com.example.springrest.domain.role.service;

import com.example.springrest.domain.role.model.dto.RoleInfoRequest;
import com.example.springrest.domain.role.model.dto.RoleInfoResponse;
import com.example.springrest.domain.role.model.entity.RoleInfo;
import com.example.springrest.domain.role.model.entity.RoleMenuMap;
import com.example.springrest.domain.role.repository.RoleInfoMapper;
import com.example.springrest.domain.role.repository.RoleMenuMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 역할 정보 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleInfoMapper roleInfoMapper;
    private final RoleMenuMapper roleMenuMapper;

    public List<RoleInfoResponse> getAllRoles() {
        return roleInfoMapper.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public RoleInfoResponse getRoleById(String roleId) {
        RoleInfo role = roleInfoMapper.findById(roleId);
        return role != null ? convertToResponse(role) : null;
    }

    public List<String> getMenuIdsByRoleId(String roleId) {
        return roleMenuMapper.findByRoleId(roleId).stream()
                .map(RoleMenuMap::getMenuId)
                .collect(Collectors.toList());
    }

    @Transactional
    public void createRole(RoleInfoRequest request) {
        RoleInfo role = convertToEntity(request);
        roleInfoMapper.insert(role);
    }

    @Transactional
    public void updateRole(RoleInfoRequest request) {
        RoleInfo role = convertToEntity(request);
        roleInfoMapper.update(role);
    }

    @Transactional
    public void deleteRole(String roleId) {
        roleMenuMapper.deleteByRoleId(roleId);
        roleInfoMapper.delete(roleId);
    }

    @Transactional
    public void assignMenus(String roleId, List<String> menuIds) {
        roleMenuMapper.deleteByRoleId(roleId);
        for (String menuId : menuIds) {
            RoleMenuMap mapping = RoleMenuMap.builder()
                    .roleId(roleId)
                    .menuId(menuId)
                    .useYn("1")
                    .build();
            roleMenuMapper.insert(mapping);
        }
    }

    private RoleInfoResponse convertToResponse(RoleInfo entity) {
        return RoleInfoResponse.builder()
                .roleId(entity.getRoleId())
                .roleName(entity.getRoleName())
                .roleDesc(entity.getRoleDesc())
                .useYn(entity.getUseYn())
                .sysInsertDtm(entity.getSysInsertDtm())
                .sysUpdateDtm(entity.getSysUpdateDtm())
                .build();
    }

    private RoleInfo convertToEntity(RoleInfoRequest request) {
        return RoleInfo.builder()
                .roleId(request.getRoleId())
                .roleName(request.getRoleName())
                .roleDesc(request.getRoleDesc())
                .useYn(request.getUseYn())
                .build();
    }
}
