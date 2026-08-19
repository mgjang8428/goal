package com.haloomin.goal.user.service;

import com.haloomin.goal.api.v1.user.auth.dto.request.ReissueRequestDto;
import com.haloomin.goal.api.v1.user.auth.dto.request.SignInRequestDto;
import com.haloomin.goal.api.v1.user.auth.dto.response.ReissueResponseDto;
import com.haloomin.goal.api.v1.user.auth.dto.response.SignInResponseDto;
import com.haloomin.goal.api.v1.user.auth.dto.request.SignUpRequestDto;
import jakarta.validation.Valid;

public interface UserAuthService {

    /**
     * 유저 서비스 가입
     *
     * @param dto 가입요청 RequestDto
     */
    void signUp(SignUpRequestDto dto);

    /**
     * 유저 로그인
     *
     * @param dto 로그인 요청 RequestDto
     * @return 로그인 성공, 생성된 인증 토큰(accessToken, refreshToken)
     */
    SignInResponseDto signIn(SignInRequestDto dto);

    /**
     * 토큰 재발급
     *
     * @param dto 토큰 재발급 요청 dto
     * @return 인증 성공, 생성된 인증 토큰(accessToken, refreshToken)
     */
    ReissueResponseDto reissue(@Valid ReissueRequestDto dto);
}
