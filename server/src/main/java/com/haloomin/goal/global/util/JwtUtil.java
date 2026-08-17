package com.haloomin.goal.global.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey secretKey;
    @Getter
    private final long accessTokenExpireTime;
    @Getter
    private final long refreshTokenExpireTime;

    public JwtUtil(
            @Value("${jwt.secretKey}") String secretKey,
            @Value("${jwt.accessTokenExpireTime}") long accessTokenExpireTime,
            @Value("${jwt.refreshTokenExpireTime}") long refreshTokenExpireTime
    ) {
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpireTime = accessTokenExpireTime;
        this.refreshTokenExpireTime = refreshTokenExpireTime;
    }

    public String createAccessToken(String username, String role) {
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + accessTokenExpireTime);
        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .claim("tokenType", "ACCESS")
                .issuedAt(now)
                .expiration(expireDate)
                .signWith(secretKey)
                .compact();
    }

    public String createRefreshToken(String username, String role) {
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + refreshTokenExpireTime);
        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .claim("tokenType", "REFRESH")
                .issuedAt(now)
                .expiration(expireDate)
                .signWith(secretKey)
                .compact();
    }

    public Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
