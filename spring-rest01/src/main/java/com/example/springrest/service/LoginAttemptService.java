package com.example.springrest.service;

import com.example.springrest.exception.RateLimitException;
import com.example.springrest.repository.LoginAttemptMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 로그인 시도 제한 서비스
 * 사용자별 로그인 실패 횟수를 추적하고 5분간 5회 초과 시 차단
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LoginAttemptService {
    
    private static final int MAX_ATTEMPTS = 5;
    private static final int BLOCK_DURATION_MINUTES = 5;
    
    private final LoginAttemptMapper loginAttemptMapper;
    
    // 메모리 기반 차단 캐시 (username -> 차단 해제 시각)
    private final Map<String, LocalDateTime> blockedUsers = new ConcurrentHashMap<>();

    /**
     * 로그인 시도 전 차단 여부 확인
     * @param username 사용자명
     * @throws RateLimitException 차단된 사용자인 경우
     */
    public void checkRateLimit(String username) {
        // 1. 메모리 캐시 확인
        LocalDateTime unblockTime = blockedUsers.get(username);
        if (unblockTime != null) {
            if (LocalDateTime.now().isBefore(unblockTime)) {
                long secondsRemaining = java.time.Duration.between(LocalDateTime.now(), unblockTime).getSeconds();
                throw new RateLimitException(
                    "Too many failed login attempts. Please try again after " + secondsRemaining + " seconds.",
                    secondsRemaining
                );
            } else {
                // 차단 시간 만료 - 캐시에서 제거
                blockedUsers.remove(username);
            }
        }
        
        // 2. DB에서 최근 5분간 실패 횟수 조회
        LocalDateTime fiveMinutesAgo = LocalDateTime.now().minusMinutes(BLOCK_DURATION_MINUTES);
        int failedAttempts = loginAttemptMapper.countFailedAttemptsSince(username, fiveMinutesAgo);
        
        if (failedAttempts >= MAX_ATTEMPTS) {
            // 차단 처리
            LocalDateTime blockUntil = LocalDateTime.now().plusMinutes(BLOCK_DURATION_MINUTES);
            blockedUsers.put(username, blockUntil);
            
            long secondsRemaining = BLOCK_DURATION_MINUTES * 60;
            throw new RateLimitException(
                "Too many failed login attempts. Please try again after " + secondsRemaining + " seconds.",
                secondsRemaining
            );
        }
    }

    /**
     * 로그인 성공 시 차단 캐시 초기화
     * @param username 사용자명
     */
    public void clearLoginAttempts(String username) {
        blockedUsers.remove(username);
        log.debug("Cleared login attempts for user: {}", username);
    }

    /**
     * 매 시간 정각에 1일 이상 지난 로그인 시도 기록 삭제
     */
    @Scheduled(cron = "0 0 * * * *")
    public void cleanupOldAttempts() {
        LocalDateTime oneDayAgo = LocalDateTime.now().minusDays(1);
        int deleted = loginAttemptMapper.deleteOldAttempts(oneDayAgo);
        if (deleted > 0) {
            log.info("Cleaned up {} old login attempt records", deleted);
        }
    }
}
