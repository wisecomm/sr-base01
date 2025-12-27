package com.example.springrest.repository;

import com.example.springrest.model.entity.RoleInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 역할 정보 데이터 접근 매퍼
 */
@Mapper
public interface RoleInfoMapper {
    RoleInfo findById(@Param("roleId") String roleId);

    List<RoleInfo> findAll();

    int insert(RoleInfo roleInfo);

    int update(RoleInfo roleInfo);

    int delete(@Param("roleId") String roleId);
}
