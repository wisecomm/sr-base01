package com.example.springrest.controller.user;

import com.example.springrest.model.dto.ApiResponse;
import com.example.springrest.model.dto.user.MenuInfoRequest;
import com.example.springrest.model.dto.user.MenuInfoResponse;
import com.example.springrest.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "User - Menu Management", description = "메뉴 관리 API")
@Slf4j
@RestController
@RequestMapping("/api/v1/user/menus")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @Operation(summary = "메뉴 목록 조회")
    @GetMapping
    public ResponseEntity<ApiResponse<List<MenuInfoResponse>>> getAllMenus() {
        return ResponseEntity.ok(ApiResponse.success(menuService.getAllMenus()));
    }

    @Operation(summary = "메뉴 상세 조회")
    @GetMapping("/{menuId}")
    public ResponseEntity<ApiResponse<MenuInfoResponse>> getMenuById(@PathVariable String menuId) {
        MenuInfoResponse menu = menuService.getMenuById(menuId);
        return menu != null ? ResponseEntity.ok(ApiResponse.success(menu)) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "메뉴 생성")
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createMenu(@Valid @RequestBody MenuInfoRequest request) {
        menuService.createMenu(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "메뉴 수정")
    @PutMapping("/{menuId}")
    public ResponseEntity<ApiResponse<Void>> updateMenu(@PathVariable String menuId,
            @Valid @RequestBody MenuInfoRequest request) {
        request.setMenuId(menuId);
        menuService.updateMenu(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "메뉴 삭제")
    @DeleteMapping("/{menuId}")
    public ResponseEntity<ApiResponse<Void>> deleteMenu(@PathVariable String menuId) {
        menuService.deleteMenu(menuId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
