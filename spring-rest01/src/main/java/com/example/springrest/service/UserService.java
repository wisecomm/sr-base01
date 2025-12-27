package com.example.springrest.service;

import com.example.springrest.model.dto.manager.UserInfoRequest;
import com.example.springrest.model.dto.manager.UserInfoResponse;
import com.example.springrest.model.entity.UserInfo;
import com.example.springrest.model.entity.UserRoleMap;
import com.example.springrest.repository.UserInfoMapper;
import com.example.springrest.repository.UserRoleMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 관리자 정보 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserInfoMapper userInfoMapper;
    private final UserRoleMapper userRoleMapper;
    private final PasswordEncoder passwordEncoder;

    public List<UserInfoResponse> getAllUsers() {
        return userInfoMapper.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public UserInfoResponse getUserById(String userId) {
        UserInfo user = userInfoMapper.findById(userId);
        return user != null ? convertToResponse(user) : null;
    }

    @Transactional
    public void createUser(UserInfoRequest request) {
        UserInfo user = convertToEntity(request);
        user.setUserPwd(passwordEncoder.encode(request.getUserPwd()));
        userInfoMapper.insert(user);
    }

    @Transactional
    public void updateUser(UserInfoRequest request) {
        UserInfo user = convertToEntity(request);
        if (request.getUserPwd() != null && !request.getUserPwd().isEmpty()) {
            user.setUserPwd(passwordEncoder.encode(request.getUserPwd()));
        }
        userInfoMapper.update(user);
    }

    @Transactional
    public void deleteUser(String userId) {
        userRoleMapper.deleteByUserId(userId);
        userInfoMapper.delete(userId);
    }

    @Transactional
    public void assignRoles(String userId, List<String> roleIds) {
        userRoleMapper.deleteByUserId(userId);
        for (String roleId : roleIds) {
            UserRoleMap mapping = UserRoleMap.builder()
                    .userId(userId)
                    .roleId(roleId)
                    .useYn("1")
                    .build();
            userRoleMapper.insert(mapping);
        }
    }

    private UserInfoResponse convertToResponse(UserInfo entity) {
        return UserInfoResponse.builder()
                .userId(entity.getUserId())
                .userEmail(entity.getUserEmail())
                .userMobile(entity.getUserMobile())
                .userName(entity.getUserName())
                .userNick(entity.getUserNick())
                .userMsg(entity.getUserMsg())
                .userDesc(entity.getUserDesc())
                .userStatCd(entity.getUserStatCd())
                .userSnsid(entity.getUserSnsid())
                .useYn(entity.getUseYn())
                .accountNonLock(entity.getAccountNonLock())
                .passwordLockCnt(entity.getPasswordLockCnt())
                .accountStartDt(entity.getAccountStartDt())
                .accountEndDt(entity.getAccountEndDt())
                .passwordExpireDt(entity.getPasswordExpireDt())
                .mdmYn(entity.getMdmYn())
                .sysInsertDtm(entity.getSysInsertDtm())
                .sysUpdateDtm(entity.getSysUpdateDtm())
                .build();
    }

    private UserInfo convertToEntity(UserInfoRequest request) {
        return UserInfo.builder()
                .userId(request.getUserId())
                .userEmail(request.getUserEmail())
                .userMobile(request.getUserMobile())
                .userName(request.getUserName())
                .userNick(request.getUserNick())
                .userPwd(request.getUserPwd())
                .userMsg(request.getUserMsg())
                .userDesc(request.getUserDesc())
                .userStatCd(request.getUserStatCd())
                .userSnsid(request.getUserSnsid())
                .useYn(request.getUseYn())
                .accountNonLock(request.getAccountNonLock())
                .passwordLockCnt(request.getPasswordLockCnt())
                .accountStartDt(request.getAccountStartDt())
                .accountEndDt(request.getAccountEndDt())
                .passwordExpireDt(request.getPasswordExpireDt())
                .mdmYn(request.getMdmYn())
                .build();
    }
}
