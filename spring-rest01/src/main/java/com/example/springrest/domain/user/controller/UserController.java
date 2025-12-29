package com.example.springrest.domain.user.controller;

import com.example.springrest.global.model.dto.ApiResponse;
import com.example.springrest.domain.user.model.dto.UserInfoRequest;
import com.example.springrest.domain.user.model.dto.UserInfoResponse;
import com.example.springrest.global.model.dto.PageResponse;
import com.example.springrest.domain.user.model.dto.UserRoleAssignRequest;
import com.example.springrest.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "User - User Management", description = "사용자 계정 관리 API")
@Slf4j
@RestController
@RequestMapping("/api/v1/user/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "사용자 목록 조회")
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<UserInfoResponse>>> getAllUsers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.success(userService.getAllUsers(page, size)));
    }

    @Operation(summary = "사용자 상세 조회")
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserInfoResponse>> getUserById(@PathVariable String userId) {
        UserInfoResponse user = userService.getUserById(userId);
        return user != null ? ResponseEntity.ok(ApiResponse.success(user)) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "사용자 생성")
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createUser(@Valid @RequestBody UserInfoRequest request) {
        userService.createUser(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "사용자 수정")
    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<Void>> updateUser(@PathVariable String userId,
            @Valid @RequestBody UserInfoRequest request) {
        request.setUserId(userId);
        userService.updateUser(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "사용자 삭제")
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "사용자 역할 부여/수정")
    @PostMapping("/assign-roles")
    public ResponseEntity<ApiResponse<Void>> assignRoles(@Valid @RequestBody UserRoleAssignRequest request) {
        userService.assignRoles(request.getUserId(), request.getRoleIds());
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
