package com.example.demo.service.base;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.example.demo.common.model.GResponse;
import com.example.demo.jwt.GJwtTokenHelper;
import com.example.demo.model.map.MapBsAdminLogin;
import com.example.demo.model.map.base.BsUserMap;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BsLoginService {

    //..
    private final GJwtTokenHelper jwtTokenHelper;
    private final BsUserService bsUserService;

    public MapBsAdminLogin adminLogin(HttpServletRequest request, String userId, String userPwd) {
        MapBsAdminLogin mapAdminLogin = new MapBsAdminLogin();

		BsUserMap userOptional = bsUserService.selectUser(userId);
        mapAdminLogin.setBsUserMap(userOptional);

        String jwt = jwtTokenHelper.generateJwt(userOptional.getUserId(), "ADMIN", "1234");
        mapAdminLogin.setAccessToken(jwt);
        jwt = jwtTokenHelper.generateRefreshToken(userOptional.getUserId(), "ADMIN", "1234");
        mapAdminLogin.setRefreshToken(jwt);

        return mapAdminLogin;
    }

    public String getTest() {
        return jwtTokenHelper.getClaimsToUserId();
    }

}