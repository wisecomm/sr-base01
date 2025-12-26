-- V1: Create users table
-- JWT 인증을 위한 사용자 테이블 생성

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,  -- BCrypt 해시 (60자 + 여유)
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL,  -- 'USER' 또는 'ADMIN'
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

-- 개발 전용 테스트 계정
-- testuser: 비밀번호 = password123
-- admin: 비밀번호 = admin123
INSERT INTO users (username, password, email, role) VALUES
  ('testuser', '$2a$10$Aet6XcUlzMWbs85FdZQSbu/ILBxoNysrBSw8QkZUPOEFati33b2Ne', 'test@example.com', 'USER'),
  ('admin', '$2a$10$Uq4TQVaKiQ/mT2vByzg4n.DkTkjY8SWryHdsuM/q2qcZ1BNrTMFea', 'admin@example.com', 'ADMIN');
