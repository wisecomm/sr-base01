package com.example.demo.mapper.base;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.demo.model.map.base.BsMenuMap;
import com.example.demo.model.param.base.BsMenuParam;

@Mapper
public interface BsMenuMapper {
    int insertMenu(BsMenuParam bsMenuParam);
    BsMenuMap selectMenu(String menuId);
    int updateMenu(BsMenuParam bsMenuParam);
    int deleteMenu(String menuId);
    List<BsMenuMap> selectMenuList(@Param("param_key") String param_key, @Param("param_value") String param_value);
}
