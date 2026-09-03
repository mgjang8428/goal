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
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Value("${app.cors.allowed-origins}")
    private String corsUrl;

    private final ErrorResponseUtil errorResponseUtil;
    private final ObjectMapper objectMapper;

    @Override
    public void commence(@NonNull HttpServletRequest request, HttpServletResponse response, @NonNull AuthenticationException authException) throws IOException {
        ResponseEntity<ResponseDto<Void>> errorResponseEntity = errorResponseUtil.unauthorizedErrorResponse(ErrorResponseType.SECURITY_UNAUTHORIZED_ERROR);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.setStatus(errorResponseEntity.getStatusCode().value());
        response.setHeader("Access-Control-Allow-Origin", corsUrl);
        response.setHeader("Access-Control-Allow-Credentials", "true");

        String errorResponseJsonString = objectMapper.writeValueAsString(errorResponseEntity.getBody());

        response.getWriter().write(errorResponseJsonString);
    }
}
