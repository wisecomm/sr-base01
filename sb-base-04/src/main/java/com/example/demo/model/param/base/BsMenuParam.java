package com.example.demo.model.param.base;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BsMenuParam {
    @NotEmpty(message = "메뉴 ID는 필수입니다")
    private Integer menuId;
    
    private String menuName;
    private String menuUrl;
    private Integer parentId;
    private Integer menuOrder;
    private String menuIcon;
    private String menuType;
    private Integer enabled;
}
