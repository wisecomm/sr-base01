package com.example.springrest.domain.user.service;

import com.example.springrest.domain.user.model.dto.UserInfoRequest;
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

    public PageResponse<UserInfo> getAllUsers(int page, int size) {
        PageHelper.startPage(page, size, "USER_ID ASC");
        List<UserInfo> users = userInfoMapper.findAll();
        PageInfo<UserInfo> pageInfo = new PageInfo<>(users);

        return PageResponse.of(pageInfo, users);
    }

    public UserInfo getUserById(String userId) {
        UserInfo user = userInfoMapper.findById(userId);
        return user;
    }

    @Transactional
    public void createUser(UserInfoRequest request) {
        if (userInfoMapper.findById(request.getUserId()) != null) {
            throw new IllegalArgumentException("이미 존재하는 사용자 ID입니다: " + request.getUserId());
        }
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

    public List<String> getUserRoleIds(String userId) {
        return userRoleMapper.findByUserId(userId).stream()
                .map(UserRoleMap::getRoleId)
                .toList();
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
