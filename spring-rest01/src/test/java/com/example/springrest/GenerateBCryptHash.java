package com.example.springrest;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * BCrypt 해시 생성 유틸리티
 */
public class GenerateBCryptHash {
    
    @Test
    void generateHashes() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        String password1 = "password123";
        String hash1 = encoder.encode(password1);
        System.out.println("testuser (password123): " + hash1);
        
        String password2 = "admin123";
        String hash2 = encoder.encode(password2);
        System.out.println("admin (admin123): " + hash2);
    }
}
