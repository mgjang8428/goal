package com.haloomin.goal.config.security.jwt.exception;

import com.haloomin.goal.global.response.dto.ResponseDto;
import com.haloomin.goal.global.response.error.ErrorResponseType;
import com.haloomin.goal.global.response.util.ErrorResponseUtil;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Component
public class JwtExceptionFilter extends OncePerRequestFilter {

    @Value("${app.cors.allowed-origins}")
    private String corsUrl;

    private final ObjectMapper objectMapper;
    private final ErrorResponseUtil errorResponseUtil;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (JwtException e) {
            responseError(response, e);
        }
    }

    private void responseError(HttpServletResponse response, JwtException exception) throws IOException {
        // TODO: 구체적 Exception 처리 구현 필요!!
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
