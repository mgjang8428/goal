package com.haloomin.goal.config.security.jwt;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws IOException, ServletException {
        if (checkAccessToken(request, response, filterChain)) return;
        // 다음 filter로
        filterChain.doFilter(request, response);
    }

    private boolean checkAccessToken(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws IOException, ServletException {
        // Authorization 헤더 값 (AccessToken) 가져오기
        String authorization = request.getHeader("Authorization");

        // Authorization null 체크: 비인증 경로를 위한
        if (authorization == null) {
            filterChain.doFilter(request, response);
            return true;
        }

        // token 앞 Bearer 체크
        if (!authorization.startsWith("Bearer ")) {
            throw new BadCredentialsException(null);
        }

        // AccessToken 추출
        String accessToken = authorization.replace("Bearer ", "");

        // AccessToken 검증 및 내용 추출
        Claims claims = jwtTokenProvider.validateUserAccessToken(accessToken);
        String username = claims.getSubject();
        String role = claims.get("role", String.class);

        // Spring Security 권한(Role) 리스트 생성
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));

        // 인증 객체 생성
        Authentication auth = new UsernamePasswordAuthenticationToken(username, null, authorities);
        // SecurityContext에 인증 정보 저장
        SecurityContextHolder.getContext().setAuthentication(auth);
        return false;
    }
}
