package com.example.springrest.domain.user.service;

import com.example.springrest.domain.user.model.dto.UserInfoRequest;
import com.example.springrest.domain.user.model.dto.UserInfoResponse;
import com.example.springrest.domain.user.model.entity.UserInfo;
import com.example.springrest.domain.user.model.entity.UserRoleMap;
import com.example.springrest.domain.user.repository.UserInfoMapper;
import com.example.springrest.domain.user.repository.UserRoleMapper;
import com.example.springrest.global.model.dto.PageResponse;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 사용자 정보 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserInfoMapper userInfoMapper;
    private final UserRoleMapper userRoleMapper;
    private final PasswordEncoder passwordEncoder;

    public PageResponse<UserInfoResponse> getAllUsers(int page, int size) {
        PageHelper.startPage(page, size);
        List<UserInfo> users = userInfoMapper.findAll();
        PageInfo<UserInfo> pageInfo = new PageInfo<>(users);

        List<UserInfoResponse> content = users.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

        return PageResponse.of(pageInfo, content);
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
                .build();
    }
}
