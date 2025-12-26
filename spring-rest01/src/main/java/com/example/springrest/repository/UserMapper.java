package com.example.springrest.repository;

import com.example.springrest.model.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;

/**
 * 사용자 데이터 접근 매퍼
 */
@Mapper
public interface UserMapper {
    /**
     * username으로 사용자 조회
     * @param username 사용자명
     * @return 사용자 엔티티 (없으면 null)
     */
    User findByUsername(@Param("username") String username);
    
    /**
     * 사용자 생성 (테스트/초기화용)
     * @param user 사용자 엔티티
     * @return 생성된 row 수
     */
    int insert(User user);
    
    /**
     * 마지막 로그인 시각 업데이트
     * @param username 사용자명
     * @param lastLoginAt 마지막 로그인 시각
     * @return 업데이트된 row 수
     */
    int updateLastLoginAt(@Param("username") String username, @Param("lastLoginAt") LocalDateTime lastLoginAt);
}
