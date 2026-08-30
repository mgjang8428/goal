package com.haloomin.goal.api.v1.user.auth;

import com.haloomin.goal.api.v1.user.auth.dto.request.SignInRequestDto;
import com.haloomin.goal.api.v1.user.auth.dto.response.ReissueResponseDto;
import com.haloomin.goal.api.v1.user.auth.dto.response.SignInResponseDto;
import com.haloomin.goal.global.dto.ResponseDto;
import com.haloomin.goal.global.util.JwtUtil;
import com.haloomin.goal.user.service.UserAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/v1/user/auth")
@RestController
public class AuthController implements AuthControllerDocs {

    @Value("${app.cookie.secure:false}")
    private boolean isCookieSecure;

    private final UserAuthService userAuthService;
    private final JwtUtil jwtUtil;

    @PostMapping("/signin")
    public ResponseEntity<ResponseDto<SignInResponseDto>> signIn(@Valid @RequestBody SignInRequestDto dto) {
        Map<String, String> signInData = userAuthService.signIn(dto);

        String accessToken = signInData.get("accessToken");
        String refreshToken = signInData.get("refreshToken");
        long refreshTokenExpirationTime = jwtUtil.getClaims(refreshToken).getExpiration().getTime();
        long expiredTime = (refreshTokenExpirationTime - System.currentTimeMillis()) / 1000;

        SignInResponseDto responseDto = new SignInResponseDto(accessToken);
        ResponseCookie refreshTokenCookie = ResponseCookie
                .from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(isCookieSecure)
                .path("/")
                .maxAge(expiredTime)
                .build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Set-Cookie", refreshTokenCookie.toString())
                .body(ResponseDto.success(responseDto));
    }

    @Override
    @PostMapping("/signout")
    public ResponseEntity<ResponseDto<Void>> signOut(String refreshToken) {
        try {
            userAuthService.signOut(refreshToken);
        } catch (RuntimeException e) {
        }
        ResponseCookie refreshTokenCookie = ResponseCookie
                .from("refreshToken", null)
                .httpOnly(true)
                .secure(isCookieSecure)
                .path("/")
                .maxAge(0)
                .build();
        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Set-Cookie", refreshTokenCookie.toString())
                .body(ResponseDto.success(null));
    }

    @PostMapping("/reissue")
    public ResponseEntity<ResponseDto<ReissueResponseDto>> reissue(@CookieValue("refreshToken") String refreshToken) {
        Map<String, String> reissueData = userAuthService.reissue(refreshToken);
        String newAccessToken = reissueData.get("accessToken");
        String newRefreshToken = reissueData.get("refreshToken");
        long refreshTokenExpirationTime = jwtUtil.getClaims(newRefreshToken).getExpiration().getTime();
        long expiredTime = (refreshTokenExpirationTime - System.currentTimeMillis()) / 1000;

        ReissueResponseDto responseDto = new ReissueResponseDto(newAccessToken);
        ResponseCookie refreshTokenCookie = ResponseCookie
                .from("refreshToken", newRefreshToken)
                .httpOnly(true)
                .secure(isCookieSecure)
                .path("/")
                .maxAge(expiredTime)
                .build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Set-Cookie", refreshTokenCookie.toString())
                .body(ResponseDto.success(responseDto));
    }
}
