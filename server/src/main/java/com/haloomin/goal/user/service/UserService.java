package com.haloomin.goal.user.service;

import com.haloomin.goal.api.v1.user.info.dto.request.DeleteUserRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.request.SignUpRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.request.UpdateMyInfoRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.response.MyInfoResponseDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    void signUp(SignUpRequestDto requestDto);

    MyInfoResponseDto getMyInfo(String username);

    void updateMyInfo(String username, UpdateMyInfoRequestDto requestDto);

    void deleteUser(String username, DeleteUserRequestDto requestDto);
}
