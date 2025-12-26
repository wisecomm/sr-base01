package com.example.springrest.repository;

import com.example.springrest.model.entity.LoginAttempt;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;

/**
 * 로그인 시도 기록 매퍼
 * Rate limiting을 위한 데이터 접근
 */
@Mapper
public interface LoginAttemptMapper {
    /**
     * 로그인 시도 기록 저장
     * @param loginAttempt 로그인 시도 엔티티
     * @return 생성된 row 수
     */
    int insert(LoginAttempt loginAttempt);
    
    /**
     * 특정 시간 이후의 실패 횟수 조회
     * @param username 사용자명
     * @param sinceTime 조회 시작 시간
     * @return 실패 횟수
     */
    int countFailedAttemptsSince(@Param("username") String username, 
                                  @Param("sinceTime") LocalDateTime sinceTime);
    
    /**
     * 90일 이전 데이터 삭제 (스케줄러용)
     * @param beforeTime 삭제 기준 시간
     * @return 삭제된 row 수
     */
    int deleteOldAttempts(@Param("beforeTime") LocalDateTime beforeTime);
}
