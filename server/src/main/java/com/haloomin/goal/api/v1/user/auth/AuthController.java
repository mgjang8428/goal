package com.haloomin.goal.api.v1.user.auth;

import com.haloomin.goal.api.v1.user.auth.dto.request.SignInRequestDto;
import com.haloomin.goal.api.v1.user.auth.dto.response.ReissueResponseDto;
import com.haloomin.goal.api.v1.user.auth.dto.response.SignInResponseDto;
import com.haloomin.goal.config.security.JwtUtil;
import com.haloomin.goal.global.response.dto.ResponseDto;
import com.haloomin.goal.global.response.util.ResponseUtil;
import com.haloomin.goal.user.service.UserAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/v1/user/auth")
@RestController
public class AuthController implements AuthControllerDocs {

    private final UserAuthService userAuthService;

    private final JwtUtil jwtUtil;
    private final ResponseUtil responseUtil;

    @Override
    @PostMapping("/signin")
    public ResponseEntity<ResponseDto<SignInResponseDto>> signIn(@Valid @RequestBody SignInRequestDto dto) {
        Map<String, String> signInData = userAuthService.signIn(dto);

        String accessToken = signInData.get("accessToken");
        String refreshToken = signInData.get("refreshToken");

        SignInResponseDto responseDto = new SignInResponseDto(accessToken);
        return responseUtil.okResponseSetRefreshCookie(responseDto, refreshToken);
    }

    @Override
    @PostMapping("/signout")
    public ResponseEntity<ResponseDto<Void>> signOut(String refreshToken) {
        userAuthService.signOut(refreshToken);
        return responseUtil.okResponseSetRefreshCookie();
    }

    @Override
    @PostMapping("/reissue")
    public ResponseEntity<ResponseDto<ReissueResponseDto>> reissue(@CookieValue("refreshToken") String refreshToken) {
        Map<String, String> reissueData = userAuthService.reissue(refreshToken);
        String newAccessToken = reissueData.get("accessToken");
        String newRefreshToken = reissueData.get("refreshToken");

        ReissueResponseDto responseDto = new ReissueResponseDto(newAccessToken);

        return responseUtil.okResponseSetRefreshCookie(responseDto, newRefreshToken);
    }
}
