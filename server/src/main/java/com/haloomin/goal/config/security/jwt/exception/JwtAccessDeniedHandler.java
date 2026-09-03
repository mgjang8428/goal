package com.haloomin.goal.config.security.jwt.exception;

import com.haloomin.goal.global.response.dto.ResponseDto;
import com.haloomin.goal.global.response.error.ErrorResponseType;
import com.haloomin.goal.global.response.util.ErrorResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Value("${app.cors.allowed-origins}")
    private String corsUrl;

    private final ObjectMapper objectMapper;
    private final ErrorResponseUtil errorResponseUtil;

    @Override
    public void handle(@NonNull HttpServletRequest request, HttpServletResponse response, @NonNull AccessDeniedException accessDeniedException) throws IOException {
        ResponseEntity<ResponseDto<Void>> errorResponseEntity = errorResponseUtil.forbiddenErrorResponse(ErrorResponseType.SECURITY_FORBIDDEN_ERROR);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.setStatus(errorResponseEntity.getStatusCode().value());
        response.setHeader("Access-Control-Allow-Origin", corsUrl);
        response.setHeader("Access-Control-Allow-Credentials", "true");

        String errorResponseJsonString = objectMapper.writeValueAsString(errorResponseEntity.getBody());

        response.getWriter().write(errorResponseJsonString);
    }
}
