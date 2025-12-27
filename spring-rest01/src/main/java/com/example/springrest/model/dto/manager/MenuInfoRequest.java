package com.example.springrest.model.dto.manager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
    private String menuName;
    private String upperMenuId;
    private String menuDesc;
    private Integer menuSeq;
    private String leftMenuYn;
    private String useYn;
    private String adminMenuYn;
    private String menuHelpUri;
    private String menuScript;
    private String personalDataYn;
}
