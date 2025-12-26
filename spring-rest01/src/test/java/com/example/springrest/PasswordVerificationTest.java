package com.example.springrest;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * BCrypt 해시 검증 테스트
 */
public class PasswordVerificationTest {

    @Test
    void testUserPasswordIsPassword123() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String storedHash = "$2a$10$Aet6XcUlzMWbs85FdZQSbu/ILBxoNysrBSw8QkZUPOEFati33b2Ne";
        String password = "password123";
        
        boolean matches = encoder.matches(password, storedHash);
        System.out.println("testuser password 'password123' matches: " + matches);
        assertTrue(matches, "testuser의 비밀번호는 'password123'이어야 합니다");
    }
    
    @Test
    void testAdminPasswordIsAdmin123() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String storedHash = "$2a$10$Uq4TQVaKiQ/mT2vByzg4n.DkTkjY8SWryHdsuM/q2qcZ1BNrTMFea";
        String password = "admin123";
        
        boolean matches = encoder.matches(password, storedHash);
        System.out.println("admin password 'admin123' matches: " + matches);
        assertTrue(matches, "admin의 비밀번호는 'admin123'이어야 합니다");
    }
}
