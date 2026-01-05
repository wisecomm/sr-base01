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

                        // 1. 요청한 리소스가 실제 파일로 존재하는 경우 바로 반환
                        if (requestedResource.exists() && requestedResource.isReadable()
                                && !requestedResource.getURL().getPath().endsWith("/")) {
                            return requestedResource;
                        }

                        // 2. 경로 뒤에 .html을 붙여서 파일이 존재하는지 확인 (Next.js static export 대응)
                        Resource htmlResource = location.createRelative(resourcePath + ".html");
                        if (htmlResource.exists() && htmlResource.isReadable()) {
                            return htmlResource;
                        }

                        // API 경로(/api/**)는 index.html로 리다이렉트하지 않음
                        if (resourcePath.startsWith("api/") || resourcePath.startsWith("/api/")) {
                            return null;
                        }

                        // 3. 그 외의 경우 index.html 반환 (SPA 클라이언트 사이드 라우팅)
                        return new ClassPathResource("/static/index.html");
                    }
                });
    }
}
