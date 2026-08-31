package com.haloomin.goal.api.v1.user.info;

import com.haloomin.goal.api.v1.user.info.dto.request.DeleteUserRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.request.SignUpRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.request.UpdateMyInfoRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.response.MyInfoResponseDto;
import com.haloomin.goal.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;

@SuppressWarnings("unused")
@Tag(name = "유저 관련 API")
public interface UserControllerDocs {

    @Operation(
            summary = "유저계정가입",
            description = "유저계정가입API"
    )
    ResponseEntity<ResponseDto<Void>> signUp(@Valid @RequestBody SignUpRequestDto requestDto);

    @Operation(
            summary = "유저정보",
            description = "유저 자신의 정보"
    )
    ResponseEntity<ResponseDto<MyInfoResponseDto>> getMyInfo(@AuthenticationPrincipal String username);

    @Operation(
            summary = "유저정보변경",
            description = "유저 자신의 정보를 변경한다."
    )
    ResponseEntity<ResponseDto<Void>> updateMyInfo(
            @AuthenticationPrincipal String username,
            @RequestBody UpdateMyInfoRequestDto requestDto
    );

    @Operation(
            summary = "유저탈퇴",
            description = "유저 본인이 서비스에서 탈퇴한다."
    )
    ResponseEntity<ResponseDto<Void>> deleteUser(
            @AuthenticationPrincipal String username,
            @RequestBody DeleteUserRequestDto requestDto
    );
}
