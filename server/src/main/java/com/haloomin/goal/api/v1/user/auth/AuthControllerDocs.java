package com.haloomin.goal.api.v1.user.auth;

import com.haloomin.goal.user.dto.auth.request.SignInRequestDto;
import com.haloomin.goal.user.dto.auth.response.ReissueResponseDto;
import com.haloomin.goal.user.dto.auth.response.SignInResponseDto;
import com.haloomin.goal.global.response.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestBody;

@SuppressWarnings("unused")
@Tag(name = "유저계정 인증 API")
public interface AuthControllerDocs {

    @Operation(
            summary = "유저계정로그인",
            description = "유저계정로그인 API",
            method = "POST"
    )
    ResponseEntity<ResponseDto<SignInResponseDto>> signIn(@Valid @RequestBody SignInRequestDto dto);

    @Operation(
            summary = "유저계정로그아웃",
            description = "유저계정로그아웃",
            method = "POST"
    )
    ResponseEntity<ResponseDto<Void>> signOut(@CookieValue("refreshToken") String refreshToken);

    @Operation(
            summary = "accessToken 재발행",
            description = "accessToken 재발행",
            method = "POST"
    )
    ResponseEntity<ResponseDto<ReissueResponseDto>> reissue(@CookieValue("refreshToken") String refreshToken);
}
