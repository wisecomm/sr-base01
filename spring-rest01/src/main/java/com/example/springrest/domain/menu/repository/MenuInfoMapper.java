package com.example.springrest.domain.menu.repository;

import com.example.springrest.domain.menu.model.entity.MenuInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 메뉴 정보 데이터 접근 매퍼
 */
@Mapper
public interface MenuInfoMapper {
    MenuInfo findById(@Param("menuId") String menuId);

    List<MenuInfo> findAll();

    int insert(MenuInfo menuInfo);

    int update(MenuInfo menuInfo);

    int delete(@Param("menuId") String menuId);
}
