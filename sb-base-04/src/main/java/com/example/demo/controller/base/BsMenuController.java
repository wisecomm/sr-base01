package com.example.demo.controller.base;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.common.exception.GException;
import com.example.demo.common.model.GResponse;
import com.example.demo.model.map.base.BsMenuMap;
import com.example.demo.model.param.base.BsMenuParam;
import com.example.demo.service.base.BsMenuService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/api/v1/base/auth")
@RestController
@RequiredArgsConstructor
public class BsMenuController {

    private final BsMenuService bsMenuService;

    @Operation(summary = "메뉴 정보 생성")
    @PostMapping("/menu")
    public ResponseEntity<GResponse> insertMenu(HttpServletResponse response
                                            , @Valid @RequestBody BsMenuParam bsMenuParam) throws GException {
        log.debug("bsMenuParam={}", bsMenuParam);
        int nReturn = bsMenuService.insertMenu(bsMenuParam);
        if(nReturn == 1) {
            return ResponseEntity.ok().body(new GResponse("0000", ""));
        } else {
            return ResponseEntity.ok().body(new GResponse("E100", "생성 실패"));
        }
    }

    @Operation(summary = "메뉴 정보 조회")
    @GetMapping("/menu/{menuId}")
    public ResponseEntity<GResponse> selectMenu(HttpServletResponse response
                                            , @PathVariable String menuId) throws GException {
        BsMenuMap bsMenuMap = bsMenuService.selectMenu(menuId);

        return ResponseEntity.ok().body(new GResponse("0000", bsMenuMap));
    }

    @Operation(summary = "메뉴 정보 수정")
    @PutMapping("/menu")
    public ResponseEntity<GResponse> updateMenu(HttpServletResponse response
                                            , @Valid @RequestBody BsMenuParam bsMenuParam) throws GException {
        int nReturn = bsMenuService.updateMenu(bsMenuParam);
        if(nReturn == 1) {
            return ResponseEntity.ok().body(new GResponse("0000", ""));
        } else {
            return ResponseEntity.ok().body(new GResponse("E100", "수정 실패"));
        }
    }

    @Operation(summary = "메뉴 정보 삭제")
    @DeleteMapping("/menu/{menuId}")
    public ResponseEntity<GResponse> deleteMenu(HttpServletResponse response
                                            , @PathVariable String menuId) throws GException {
        int nReturn = bsMenuService.deleteMenu(menuId);
        if(nReturn == 1) {
            return ResponseEntity.ok().body(new GResponse("0000", ""));
        } else {
            return ResponseEntity.ok().body(new GResponse("E100", "삭제 실패"));
        }
    }

    @Operation(summary = "메뉴 정보 목록 조회")
    @GetMapping("/menus")
    public ResponseEntity<GResponse> retrieveMenus(HttpServletResponse response
        , @RequestParam(value = "pageNum", defaultValue="1") int page_num
        , @RequestParam(value = "pageSize", defaultValue="10") int page_size
        , @RequestParam(value = "param_key", defaultValue="") String param_key
        , @RequestParam(value = "param_value", defaultValue="") String param_value) throws GException {

        PageHelper.startPage(page_num, page_size);
        List<BsMenuMap> listData = bsMenuService.selectMenuList(param_key, param_value);

        return ResponseEntity.ok().body(new GResponse("0000", PageInfo.of(listData)));
    }
}
