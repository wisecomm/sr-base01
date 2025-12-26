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
import com.example.demo.model.map.base.BsUserMap;
import com.example.demo.model.param.base.BsUserParam;
import com.example.demo.service.base.BsUserService;
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
public class BsUserController {

    //..
    private final BsUserService bsUserService;

    @Operation(summary = "사용자 정보 생성")
    @PostMapping("/user")
    public ResponseEntity<GResponse> insertUser(HttpServletResponse response
                                            , @Valid @RequestBody BsUserParam bsUserParam) throws GException {

        log.debug("bsUserParam={}", bsUserParam);
        int nReturn = bsUserService.insertUser(bsUserParam);
        if(nReturn == 1) {
            return ResponseEntity.ok().body(new GResponse("0000", ""));
        } else {
            return ResponseEntity.ok().body(new GResponse("E100", "생성 실패"));
        }
    }

    @Operation(summary = "사용자 정보 조회")
    @GetMapping("/user/{userId}")
    public ResponseEntity<GResponse> selectUser(HttpServletResponse response
                                            , @PathVariable String userId) throws GException {
        BsUserMap bsUserMap = bsUserService.selectUser(userId);

        return ResponseEntity.ok().body(new GResponse("0000", bsUserMap));
    }

    @Operation(summary = "사용자 정보 수정")
    @PutMapping("/user")
    public ResponseEntity<GResponse> update(HttpServletResponse response
                                            , @Valid @RequestBody BsUserParam bsUserParam) throws GException {
        int nReturn = bsUserService.updateUser(bsUserParam);
        if(nReturn == 1) {
            return ResponseEntity.ok().body(new GResponse("0000", ""));
        } else {
            return ResponseEntity.ok().body(new GResponse("E100", "수정 실패"));
        }
    }

    @Operation(summary = "사용자 정보 삭제")
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<GResponse> delete(HttpServletResponse response
                                            , @PathVariable String userId) throws GException {
        int nReturn = bsUserService.deleteUser(userId);
        if(nReturn == 1) {
            return ResponseEntity.ok().body(new GResponse("0000", ""));
        } else {
            return ResponseEntity.ok().body(new GResponse("E100", "삭제 실패"));
        }
    }

    @Operation(summary = "사용자 정보 조회")
    @GetMapping("/users")
    public ResponseEntity<GResponse> retrieveUsers(HttpServletResponse response
        , @RequestParam(value = "pageNum", defaultValue="1") int page_num
        , @RequestParam(value = "pageSize", defaultValue="10") int page_size
        , @RequestParam(value = "param_key", defaultValue="") String param_key
        , @RequestParam(value = "param_value", defaultValue="") String param_value) throws GException {

        PageHelper.startPage(page_num, page_size);
        List<BsUserMap> listData = bsUserService.selectUserList(param_key, param_value);

        return ResponseEntity.ok().body(new GResponse("0000", PageInfo.of(listData)));
    }


}
