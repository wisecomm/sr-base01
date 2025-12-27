package com.example.springrest.service;

import com.example.springrest.model.dto.user.RoleInfoRequest;
import com.example.springrest.model.dto.user.RoleInfoResponse;
import com.example.springrest.model.entity.RoleInfo;
import com.example.springrest.model.entity.RoleMenuMap;
import com.example.springrest.repository.RoleInfoMapper;
import com.example.springrest.repository.RoleMenuMapper;
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
                .roleStartDt(entity.getRoleStartDt())
                .roleEndDt(entity.getRoleEndDt())
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
                .roleStartDt(request.getRoleStartDt())
                .roleEndDt(request.getRoleEndDt())
                .useYn(request.getUseYn())
                .build();
    }
}
