package com.example.springrest.model.dto.manager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 관리자 정보 요청 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoRequest {
    private String userId;
    private String userEmail;
    private String userMobile;
    private String userName;
    private String userNick;
    private String userPwd;
    private String userMsg;
    private String userDesc;
    private String userStatCd;
    private String userSnsid;
    private String useYn;
    private String accountNonLock;
    private Integer passwordLockCnt;
    private LocalDateTime accountStartDt;
    private LocalDateTime accountEndDt;
    private LocalDateTime passwordExpireDt;
    private String mdmYn;
}
