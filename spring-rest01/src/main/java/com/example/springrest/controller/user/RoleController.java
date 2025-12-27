package com.example.springrest.controller.user;

import com.example.springrest.model.dto.ApiResponse;
import com.example.springrest.model.dto.user.RoleInfoRequest;
import com.example.springrest.model.dto.user.RoleInfoResponse;
import com.example.springrest.model.dto.user.RoleMenuAssignRequest;
import com.example.springrest.service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "User - Role Management", description = "역할 관리 API")
@Slf4j
@RestController
@RequestMapping("/api/v1/user/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @Operation(summary = "역할 목록 조회")
    @GetMapping
    public ResponseEntity<ApiResponse<List<RoleInfoResponse>>> getAllRoles() {
        return ResponseEntity.ok(ApiResponse.success(roleService.getAllRoles()));
    }

    @Operation(summary = "역할 상세 조회")
    @GetMapping("/{roleId}")
    public ResponseEntity<ApiResponse<RoleInfoResponse>> getRoleById(@PathVariable String roleId) {
        RoleInfoResponse role = roleService.getRoleById(roleId);
        return role != null ? ResponseEntity.ok(ApiResponse.success(role)) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "역할 생성")
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createRole(@Valid @RequestBody RoleInfoRequest request) {
        roleService.createRole(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "역할 수정")
    @PutMapping("/{roleId}")
    public ResponseEntity<ApiResponse<Void>> updateRole(@PathVariable String roleId,
            @Valid @RequestBody RoleInfoRequest request) {
        request.setRoleId(roleId);
        roleService.updateRole(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "역할 삭제")
    @DeleteMapping("/{roleId}")
    public ResponseEntity<ApiResponse<Void>> deleteRole(@PathVariable String roleId) {
        roleService.deleteRole(roleId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "역할 메뉴 부여/수정")
    @PostMapping("/assign-menus")
    public ResponseEntity<ApiResponse<Void>> assignMenus(@Valid @RequestBody RoleMenuAssignRequest request) {
        roleService.assignMenus(request.getRoleId(), request.getMenuIds());
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
