package com.example.demo.model.map.base;

import java.util.Date;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BsMenuMap {
    private Integer menuId;
    private String menuName;
    private String menuUrl;
    private Integer parentId;
    private Integer menuOrder;
    private String menuIcon;
    private String menuType;
    private Integer enabled;
    private Date createdAt;
    private Date updatedAt;
}
