package com.example.demo.model.param.base;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BsUserParam {

    private String userId;
    private String userName;
    private String password;
    private String email;
    private String phone;
    private boolean enabled;

}



