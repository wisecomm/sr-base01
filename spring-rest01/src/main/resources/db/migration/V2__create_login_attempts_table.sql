-- V2: Create login_attempts table
-- Rate limiting을 위한 로그인 시도 기록 테이블

CREATE TABLE login_attempts (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    attempt_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    success BOOLEAN NOT NULL,
    ip_address VARCHAR(45),  -- IPv6 지원 (최대 45자)
    user_agent VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_login_attempts_username_time ON login_attempts(username, attempt_time DESC);
CREATE INDEX idx_login_attempts_success ON login_attempts(success);
