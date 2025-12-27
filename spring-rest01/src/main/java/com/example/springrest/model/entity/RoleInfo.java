package com.example.springrest.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 역할 정보 엔티티
 * DB CHMM_ROLE_INFO 테이블과 매핑
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleInfo {
    private String roleId; // 롤_아이디
    private String roleName; // 롤_명
    private String roleDesc; // 롤_설명
    private LocalDateTime roleStartDt; // 롤_시작_일시
    private LocalDateTime roleEndDt; // 롤_종료_일시
    private String useYn; // 사용 여부
    private LocalDateTime sysInsertDtm; // 시스템_입력_일시
    private String sysInsertUserId; // 시스템_입력_사용자_아이디
    private LocalDateTime sysUpdateDtm; // 시스템_수정_일시
    private String sysUpdateUserId; // 시스템_수정_사용자_아이디
}
