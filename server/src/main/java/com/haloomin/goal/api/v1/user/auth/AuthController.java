package com.haloomin.goal.api.v1.user.auth;

import com.haloomin.goal.api.v1.user.auth.docs.AuthControllerDocs;
import com.haloomin.goal.api.v1.user.auth.dto.SignInRequestDto;
import com.haloomin.goal.api.v1.user.auth.dto.SignUpRequestDto;
import com.haloomin.goal.global.dto.ResponseDto;
import com.haloomin.goal.global.util.JwtUtil;
import com.haloomin.goal.user.service.dto.AuthTokens;
import com.haloomin.goal.user.service.UserAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/v1/user/auth")
@RestController
public class AuthController implements AuthControllerDocs {

    private final UserAuthService userAuthService;
    private final JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<ResponseDto<Void>> signUp(@Valid @RequestBody SignUpRequestDto dto) {
        userAuthService.signUp(dto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseDto.success(null));
    }

    @PostMapping("/signin")
    public ResponseEntity<ResponseDto<Void>> signIn(@Valid @RequestBody SignInRequestDto dto) {
        AuthTokens responseDto = userAuthService.signIn(dto);

        ResponseCookie accessTokenCokie = makeTokenCookie(
                AuthTokenType.ACCESS_TOKEN,
                responseDto.accessToken(),
                jwtUtil.getAccessTokenExpireTime()
        );
        ResponseCookie refreshTokenCokie = makeTokenCookie(
                AuthTokenType.REFRESH_TOKEN,
                responseDto.refreshToken(),
                jwtUtil.getRefreshTokenExpireTime()
        );
        return ResponseEntity
                .status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, accessTokenCokie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCokie.toString())
                .body(ResponseDto.success(null));
    }

    /**
     * response 토큰쿠기 생성
     * @param tokenType 생성할 토큰의 종류
     * @param token RAW 토큰 값
     * @param expireTime 쿠키 만료시간 지정
     * @return 생성된 토큰쿠키
     */
    private ResponseCookie makeTokenCookie(AuthTokenType tokenType, String token, long expireTime) {
        return ResponseCookie
                .from(tokenType.getTokenName(), token)
                .path(tokenType.getAllowPath())
                .httpOnly(true)
                .maxAge(expireTime)
                .sameSite("Strict")
                .build();
    }
}
