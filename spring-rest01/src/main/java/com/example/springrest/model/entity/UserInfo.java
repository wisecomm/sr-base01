package com.example.springrest.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 관리자 상세 정보 엔티티
 * DB CHMM_USER_INFO 테이블과 매핑
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    private String userId; // 관리자_아이디
    private String userEmail; // 관리자_이메일
    private String userMobile; // 관리자_모바일
    private String userName; // 관리자_명
    private String userNick; // 관리자_닉네임
    private String userPwd; // 관리자_암호
    private String userMsg; // 관리자_메시지
    private String userDesc; // 관리자_설명
    private String userStatCd; // 관리자_상태_코드
    private String userSnsid; // 관리자_SNS_아이디
    private String useYn; // 사용 여부
    private String accountNonLock; // 관리자 계정 잠김 여부
    private Integer passwordLockCnt; // 비밀번호 잠금 시도 횟수
    private LocalDateTime accountStartDt; // 관리자 시작날짜
    private LocalDateTime accountEndDt; // 관리자 종료날짜
    private LocalDateTime passwordExpireDt; // 패스워드 만료 날짜
    private String mdmYn; // 모바일 기기 관리 여부
    private LocalDateTime sysInsertDtm; // 시스템_입력_일시
    private String sysInsertUserId; // 시스템_입력_관리자_아이디
    private LocalDateTime sysUpdateDtm; // 시스템_수정_일시
    private String sysUpdateUserId; // 시스템_수정_관리자_아이디
}
