package com.haloomin.goal.user.service;

import com.haloomin.goal.user.dto.auth.request.SignInRequestDto;

import java.util.Map;

public interface UserAuthService {

    /**
     * 유저 로그인
     *
     * @param dto 로그인 요청 RequestDto
     * @return 로그인 성공, 생성된 인증 토큰(accessToken, refreshToken)
     */
    Map<String, String> signIn(SignInRequestDto dto);

    /**
     * 유저 로그아웃
     *
     * @param refreshToken 로그아웃 할 refreshToken
     */
    void signOut(String refreshToken);

    /**
     * 토큰 재발급
     *
     * @param refreshToken 토큰 재발급 요청 token
     * @return 인증 성공, 생성된 인증 토큰(accessToken, refreshToken)
     */
    Map<String, String> reissue(String refreshToken);
}
