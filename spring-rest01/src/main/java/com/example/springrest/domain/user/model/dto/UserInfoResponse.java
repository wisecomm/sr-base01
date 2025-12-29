package com.example.springrest.domain.user.model.dto;

import com.example.springrest.domain.user.model.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 사용자 정보 응답 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponse {
    // 호환성을 위한 필드
    private String username;
    private String email;
    private UserRole role;

    // 상세 필드 (CHMM_USER_INFO 매핑)
    private String userId;
    private String userEmail;
    private String userMobile;
    private String userName;
    private String userNick;
    private String userMsg;
    private String userDesc;
    private String userStatCd;
    private String userSnsid;
    private String useYn;
    private LocalDateTime sysInsertDtm;
    private LocalDateTime sysUpdateDtm;
}
