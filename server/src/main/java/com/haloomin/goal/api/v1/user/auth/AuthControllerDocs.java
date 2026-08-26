package com.haloomin.goal.api.v1.user.auth;

import com.haloomin.goal.api.v1.user.auth.dto.request.SignInRequestDto;
import com.haloomin.goal.api.v1.user.auth.dto.request.SignUpRequestDto;
import com.haloomin.goal.api.v1.user.auth.dto.response.ReissueResponseDto;
import com.haloomin.goal.api.v1.user.auth.dto.response.SignInResponseDto;
import com.haloomin.goal.global.dto.ResponseDto;
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
            summary = "유저계정가입",
            description = "유저계정가입 API"
    )
    ResponseEntity<ResponseDto<Void>> signUp(@Valid @RequestBody SignUpRequestDto dto);

    @Operation(
            summary = "유저계정로그인",
            description = "유저계정로그인 API"
    )
    ResponseEntity<ResponseDto<SignInResponseDto>> signIn(@Valid @RequestBody SignInRequestDto dto);

    @Operation(
            summary = "유저계정로그아웃",
            description = "유저계정로그아웃"
    )
    ResponseEntity<ResponseDto<Void>> signOut(@CookieValue("refreshToken") String refreshToken);

    @Operation(
            summary = "accessToken 재발행",
            description = "accessToken 재발행"
    )
    ResponseEntity<ResponseDto<ReissueResponseDto>> reissue(@CookieValue("refreshToken") String refreshToken);
}
