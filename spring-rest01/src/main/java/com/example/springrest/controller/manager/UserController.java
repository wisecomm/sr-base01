package com.example.springrest.controller.manager;

import com.example.springrest.model.dto.ApiResponse;
import com.example.springrest.model.dto.manager.UserInfoRequest;
import com.example.springrest.model.dto.manager.UserInfoResponse;
import com.example.springrest.model.dto.manager.UserRoleAssignRequest;
import com.example.springrest.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Manager - User Management", description = "관리자 계정 관리 API")
@Slf4j
@RestController
@RequestMapping("/api/v1/manager/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "관리자 목록 조회")
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserInfoResponse>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.success(userService.getAllUsers()));
    }

    @Operation(summary = "관리자 상세 조회")
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserInfoResponse>> getUserById(@PathVariable String userId) {
        UserInfoResponse user = userService.getUserById(userId);
        return user != null ? ResponseEntity.ok(ApiResponse.success(user)) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "관리자 생성")
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createUser(@Valid @RequestBody UserInfoRequest request) {
        userService.createUser(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "관리자 수정")
    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<Void>> updateUser(@PathVariable String userId,
            @Valid @RequestBody UserInfoRequest request) {
        request.setUserId(userId);
        userService.updateUser(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "관리자 삭제")
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "관리자 역할 부여/수정")
    @PostMapping("/assign-roles")
    public ResponseEntity<ApiResponse<Void>> assignRoles(@Valid @RequestBody UserRoleAssignRequest request) {
        userService.assignRoles(request.getUserId(), request.getRoleIds());
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
