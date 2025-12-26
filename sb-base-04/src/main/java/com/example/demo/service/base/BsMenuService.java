package com.example.demo.service.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.common.exception.GException;
import com.example.demo.mapper.base.BsMenuMapper;
import com.example.demo.model.map.base.BsMenuMap;
import com.example.demo.model.param.base.BsMenuParam;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BsMenuService {

    @Autowired
    private BsMenuMapper bsMenuMapper;

    public int insertMenu(BsMenuParam bsMenuParam) throws GException {
        return bsMenuMapper.insertMenu(bsMenuParam);
    }

    public BsMenuMap selectMenu(String menuId) throws GException {
        return bsMenuMapper.selectMenu(menuId);
    }

    public int updateMenu(BsMenuParam bsMenuParam) throws GException {
        return bsMenuMapper.updateMenu(bsMenuParam);
    }

    public int deleteMenu(String menuId) throws GException {
        return bsMenuMapper.deleteMenu(menuId);
    }

    public List<BsMenuMap> selectMenuList(String param_key, String param_value) throws GException {
        return bsMenuMapper.selectMenuList(param_key, param_value);
    }
}
