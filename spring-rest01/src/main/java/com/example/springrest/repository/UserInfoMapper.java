package com.example.springrest.repository;

import com.example.springrest.model.entity.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 사용자 상세 정보 데이터 접근 매퍼
 */
@Mapper
public interface UserInfoMapper {
    UserInfo findById(@Param("userId") String userId);

    List<UserInfo> findAll();

    int insert(UserInfo userInfo);

    int update(UserInfo userInfo);

    int delete(@Param("userId") String userId);
}
