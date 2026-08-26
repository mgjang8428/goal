package com.haloomin.goal.config.security;

import com.haloomin.goal.global.dto.ResponseDto;
import com.haloomin.goal.global.dto.ResponseDtoError;
import com.haloomin.goal.global.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final String corsUrl;

    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws IOException, ServletException {
        try {
            // Authorization 헤더 값 (AccessToken) 가져오기
            String authorization = request.getHeader("Authorization");

            // Authorization null 체크
            if (authorization == null) {
                filterChain.doFilter(request, response);
                return;
            }

            // token 앞 Bearer 체크
            if (!authorization.startsWith("Bearer ")) {
                throw new BadCredentialsException(null);
            }

            // AccessToken 추출
            String accessToken = authorization.replace("Bearer ", "");


            // AccessToken 검증 및 내용 추출
            Claims claims = jwtUtil.getClaims(accessToken);
            String username = claims.getSubject();
            String role = claims.get("role", String.class);
            String tokenType = claims.get("tokenType", String.class);

            // TokenType 체크
            if (!"ACCESS".equals(tokenType)) {
                throw new BadCredentialsException(null);
            }

            // Spring Security 권한(Role) 리스트 생성
            List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));

            // 인증 객체 생성
            Authentication auth = new UsernamePasswordAuthenticationToken(username, null, authorities);
            // SecurityContext에 인증 정보 저장
            SecurityContextHolder.getContext().setAuthentication(auth);
            // 다음 filter로
            filterChain.doFilter(request, response);

        } catch (BadCredentialsException | JwtException e) {
            responseError(response, ResponseDtoError.unauthorized());
        }
    }

    private void responseError(@NonNull HttpServletResponse response, ResponseDtoError errorDto) throws IOException {
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", corsUrl);
        response.setHeader("Access-Control-Allow-Credentials", "true");

        ResponseDto<Void> responseDto = ResponseDto.clientFail(errorDto);
        String json = objectMapper.writeValueAsString(responseDto);

        PrintWriter writer = response.getWriter();
        writer.write(json);
        writer.flush();
    }
}
