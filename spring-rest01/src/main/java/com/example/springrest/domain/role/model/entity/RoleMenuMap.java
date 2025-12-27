package com.example.springrest.domain.role.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 역할-메뉴 매핑 엔티티
 * DB CHMM_ROLE_MENU_MAP 테이블과 매핑
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleMenuMap {
    private String roleId; // 롤_아이디
    private String menuId; // 메뉴_아이디
    private String useYn; // 사용 여부
    private LocalDateTime sysInsertDtm; // 시스템_입력_일시
}
