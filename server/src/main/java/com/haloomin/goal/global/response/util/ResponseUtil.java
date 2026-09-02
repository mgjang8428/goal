package com.haloomin.goal.global.response.util;

import com.haloomin.goal.config.security.JwtUtil;
import com.haloomin.goal.global.response.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public final class ResponseUtil {

    @Value("${app.cookie.secure:false}")
    private boolean isCookieSecure;
    private final JwtUtil jwtUtil;

    /**
     * 성공 응답
     *
     * @return ResponseEntity<ResponseDto<Void>>
     */
    public ResponseEntity<ResponseDto<Void>> okResponse() {
        ResponseDto<Void> responseDto = ResponseDto.<Void>builder().build();
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    /**
     * 성공 응답 : DTO 포함
     *
     * @param dto DTO
     * @param <T> DTO
     * @return ResponseEntity<ResponseDto<T>>
     */
    public <T> ResponseEntity<ResponseDto<T>> okResponse(T dto) {
        ResponseDto<T> responseDto = ResponseDto.<T>builder().dto(dto).build();
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    /**
     * 성공 응답 : refreshToken 포함
     * 클라이언트 RefreshTokenCookie 제거
     *
     * @return ResponseEntity<ResponseDto<Void>>
     */
    public ResponseEntity<ResponseDto<Void>> okResponseSetRefreshCookie() {
        // make ResponseDto
        ResponseDto<Void> responseDto = ResponseDto.<Void>builder().build();
        // make RefreshTokenCookie
        ResponseCookie refreshTokenCookie = makeRefreshTokenCookie(null, 0);
        // make & return ResponseEntity
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Set-Cookie", refreshTokenCookie.toString())
                .body(responseDto);
    }

    /**
     * 성공 응답 : DTO, refreshToken 포함
     *
     * @param dto          DTO
     * @param refreshToken refreshToken
     * @param <T>          DTO
     * @return ResponseEntity<ResponseDto<T>>
     */
    public <T> ResponseEntity<ResponseDto<T>> okResponseSetRefreshCookie(
            T dto,
            String refreshToken
    ) {
        // make ResponseDto
        ResponseDto<T> responseDto = ResponseDto.<T>builder().dto(dto).build();
        // refreshToken expiredTime
        long refreshTokenExpirationTime = jwtUtil.getClaims(refreshToken).getExpiration().getTime();
        long expiredTime = (refreshTokenExpirationTime - System.currentTimeMillis()) / 1000;
        // make RefreshTokenCookie
        ResponseCookie refreshTokenCookie = makeRefreshTokenCookie(refreshToken, expiredTime);
        // make & return ResponseEntity
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Set-Cookie", refreshTokenCookie.toString())
                .body(responseDto);
    }

    /**
     * RefreshToken 쿠키 생성
     *
     * @param refreshToken refreshToken
     * @param expiredTime  refreshToken 만료시간
     * @return RefreshTokenCookie
     */
    private ResponseCookie makeRefreshTokenCookie(String refreshToken, long expiredTime) {
        return ResponseCookie
                .from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(isCookieSecure)
                .path("/")
                .maxAge(expiredTime)
                .build();
    }
}
