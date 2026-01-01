package com.example.springrest.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

/**
 * SPA(Single Page Application) 라우팅 지원을 위한 설정
 * 존재하지 않는 경로나 정적 자원이 아닌 요청을 index.html로 리다이렉트하여
 * 프론트엔드(Next.js)에서 라우팅을 처리할 수 있도록 함
 */
@Configuration
public class SpaWebMvcConfigurer implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(@NonNull String resourcePath, @NonNull Resource location)
                            throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);

                        // 요청한 리소스가 존재하고 읽기 가능한 경우 해당 리소스 반환
                        // 단, API 경로는 제외 (API 경로는 404가 나야 함)
                        if (requestedResource.exists() && requestedResource.isReadable()) {
                            return requestedResource;
                        }

                        // API 경로(/api/**)는 index.html로 리다이렉트하지 않음
                        if (resourcePath.startsWith("api/") || resourcePath.startsWith("/api/")) {
                            return null;
                        }

                        // 그 외의 경우(Next.js 라우팅 경로 등) index.html 반환
                        return new ClassPathResource("/static/index.html");
                    }
                });
    }
}
