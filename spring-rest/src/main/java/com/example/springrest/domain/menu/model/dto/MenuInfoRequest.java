package com.example.springrest.domain.menu.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 메뉴 정보 요청 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuInfoRequest {
    private String menuId;
    private Integer menuLvl;
    private String menuUri;
    private String menuImgUri;
    private String menuName;
    private String upperMenuId;
    private String menuDesc;
    private Integer menuSeq;
    private String useYn;
}
