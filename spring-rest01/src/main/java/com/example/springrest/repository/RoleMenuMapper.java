package com.example.springrest.repository;

import com.example.springrest.model.entity.RoleMenuMap;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 역할-메뉴 매핑 데이터 접근 매퍼
 */
@Mapper
public interface RoleMenuMapper {
    List<RoleMenuMap> findByRoleId(@Param("roleId") String roleId);

    List<RoleMenuMap> findByMenuId(@Param("menuId") String menuId);

    int insert(RoleMenuMap roleMenuMap);

    int delete(@Param("roleId") String roleId, @Param("menuId") String menuId);

    int deleteByRoleId(@Param("roleId") String roleId);
}
