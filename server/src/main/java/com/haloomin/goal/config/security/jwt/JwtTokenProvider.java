package com.haloomin.goal.config.security.jwt;

import com.haloomin.goal.user.exception.AlreadyExpiredTokenException;
import com.haloomin.goal.user.exception.IllegalTokenTypeException;
import com.haloomin.goal.user.exception.NotMatchRefreshTokenRoleException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;
    @Getter
    private final long accessTokenExpireTime;
    @Getter
    private final long refreshTokenExpireTime;

    @Autowired
    public JwtTokenProvider(
            @Value("${jwt.secretKey}") String secretKey,
            @Value("${jwt.accessTokenExpireTime}") long accessTokenExpireTime,
            @Value("${jwt.refreshTokenExpireTime}") long refreshTokenExpireTime
    ) {
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpireTime = accessTokenExpireTime;
        this.refreshTokenExpireTime = refreshTokenExpireTime;
    }

    private String createToken(Authentication authentication, long expireTime, String tokenType) {
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + expireTime);
        String username = authentication.getName();
        String role = authentication.getAuthorities().iterator().next().getAuthority();

        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .claim("tokenType", tokenType)
                .issuedAt(now)
                .expiration(expireDate)
                .signWith(secretKey)
                .compact();
    }

    public String createAccessToken(Authentication authentication) {
        return createToken(authentication, accessTokenExpireTime, "ACCESS");
    }

    public String createRefreshToken(Authentication authentication) {
        return createToken(authentication, refreshTokenExpireTime, "REFRESH");
    }

    public Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private @NonNull Claims validateToken(String refreshToken, String tokenType, String roleType) {
        Claims claims = getClaims(refreshToken);
        String type = claims.get("tokenType", String.class);
        String role = claims.get("role", String.class);
        Date expiration = claims.getExpiration();

        if (!tokenType.equals(type)) {
            throw new IllegalTokenTypeException();
        }

        if (!roleType.equals(role)) {
            throw new NotMatchRefreshTokenRoleException();
        }

        Date now = new Date();
        if (expiration.before(now)) {
            throw new AlreadyExpiredTokenException();
        }

        return claims;
    }

    public Claims validateUserRefreshToken(String refreshToken) {
        return validateToken(refreshToken, "REFRESH", "ROLE_USER");
    }

    public Claims validateUserAccessToken(String accessToken) {
        return validateToken(accessToken, "ACCESS", "ROLE_USER");
    }
}
