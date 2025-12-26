package com.example.demo.mapper.base;


import com.example.demo.model.map.base.BsUserMap;
import com.example.demo.model.param.base.BsUserParam;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BsUserMapper {

    int insertUser(BsUserParam bsUserParam);
    BsUserMap selectUser(String userId);
    int updateUser(BsUserParam bsUserParam);
    int deleteUser(String userId);
    List<BsUserMap> selectUserList(@Param("param_key") String param_key, @Param("param_value") String param_value);
}
