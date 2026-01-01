package com.example.springrest.domain.user.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 사용자 정보 요청 DTO
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
}
