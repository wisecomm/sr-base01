package com.example.springrest.domain.menu.service;

import com.example.springrest.domain.menu.model.dto.MenuInfoRequest;
import com.example.springrest.domain.menu.model.dto.MenuInfoResponse;
import com.example.springrest.domain.menu.model.entity.MenuInfo;
import com.example.springrest.domain.menu.repository.MenuInfoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 메뉴 정보 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuInfoMapper menuInfoMapper;

    public List<MenuInfoResponse> getAllMenus() {
        return menuInfoMapper.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public MenuInfoResponse getMenuById(String menuId) {
        MenuInfo menu = menuInfoMapper.findById(menuId);
        return menu != null ? convertToResponse(menu) : null;
    }

    @Transactional
    public void createMenu(MenuInfoRequest request) {
        MenuInfo menu = convertToEntity(request);
        menuInfoMapper.insert(menu);
    }

    @Transactional
    public void updateMenu(MenuInfoRequest request) {
        MenuInfo menu = convertToEntity(request);
        menuInfoMapper.update(menu);
    }

    @Transactional
    public void deleteMenu(String menuId) {
        menuInfoMapper.delete(menuId);
    }

    private MenuInfoResponse convertToResponse(MenuInfo entity) {
        return MenuInfoResponse.builder()
                .menuId(entity.getMenuId())
                .menuLvl(entity.getMenuLvl())
                .menuUri(entity.getMenuUri())
                .menuName(entity.getMenuName())
                .upperMenuId(entity.getUpperMenuId())
                .menuDesc(entity.getMenuDesc())
                .menuSeq(entity.getMenuSeq())
                .leftMenuYn(entity.getLeftMenuYn())
                .useYn(entity.getUseYn())
                .adminMenuYn(entity.getAdminMenuYn())
                .menuHelpUri(entity.getMenuHelpUri())
                .menuScript(entity.getMenuScript())
                .personalDataYn(entity.getPersonalDataYn())
                .sysInsertDtm(entity.getSysInsertDtm())
                .sysUpdateDtm(entity.getSysUpdateDtm())
                .build();
    }

    private MenuInfo convertToEntity(MenuInfoRequest request) {
        return MenuInfo.builder()
                .menuId(request.getMenuId())
                .menuLvl(request.getMenuLvl())
                .menuUri(request.getMenuUri())
                .menuName(request.getMenuName())
                .upperMenuId(request.getUpperMenuId())
                .menuDesc(request.getMenuDesc())
                .menuSeq(request.getMenuSeq())
                .leftMenuYn(request.getLeftMenuYn())
                .useYn(request.getUseYn())
                .adminMenuYn(request.getAdminMenuYn())
                .menuHelpUri(request.getMenuHelpUri())
                .menuScript(request.getMenuScript())
                .personalDataYn(request.getPersonalDataYn())
                .build();
    }
}
