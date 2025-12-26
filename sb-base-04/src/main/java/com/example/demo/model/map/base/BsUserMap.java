package com.example.demo.model.map.base;

import lombok.Data;
import java.util.Date;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BsUserMap {
    private String userId;
    private String userName;
    private String password;
    private String email;
    private String phone;
    private boolean enabled;
    private Date lastLoginAt;
    private Date createdAt;
    private Date updatedAt;

}