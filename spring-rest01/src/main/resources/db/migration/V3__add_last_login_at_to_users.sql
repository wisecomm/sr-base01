-- Add last_login_at column to users table
ALTER TABLE users
ADD COLUMN last_login_at TIMESTAMP;

-- Add index for last_login_at for performance
CREATE INDEX idx_users_last_login_at ON users(last_login_at);
