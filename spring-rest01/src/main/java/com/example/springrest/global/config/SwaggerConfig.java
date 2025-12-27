package com.example.springrest.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Swagger/OpenAPI 설정
 * 개발 환경에서만 활성화
 */
@Configuration
@Profile("dev")
public class SwaggerConfig {

        private static final String SECURITY_SCHEME_NAME = "Bearer Authentication";

        @Bean
        public OpenAPI openAPI() {
                return new OpenAPI()
                                .info(new Info()
                                                .title("Spring REST API")
                                                .version("v1.0.0")
                                                .description("JWT-based REST API with Spring Boot"))
                                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                                .components(new Components()
                                                .addSecuritySchemes(SECURITY_SCHEME_NAME,
                                                                new SecurityScheme()
                                                                                .name(SECURITY_SCHEME_NAME)
                                                                                .type(SecurityScheme.Type.HTTP)
                                                                                .scheme("bearer")
                                                                                .bearerFormat("JWT")
                                                                                .description("JWT token for authentication")));
        }
}
