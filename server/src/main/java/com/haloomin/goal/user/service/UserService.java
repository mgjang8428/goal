package com.haloomin.goal.user.service;

import com.haloomin.goal.user.dto.user.request.DeleteUserRequestDto;
import com.haloomin.goal.user.dto.user.request.SignUpRequestDto;
import com.haloomin.goal.user.dto.user.request.UpdateMyInfoRequestDto;
import com.haloomin.goal.user.dto.user.response.MyInfoResponseDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    // extends UserDetailService
    // UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    void signUp(SignUpRequestDto requestDto);

    void checkUsername(String username);

    MyInfoResponseDto getMyInfo(String username);

    void updateMyInfo(String username, UpdateMyInfoRequestDto requestDto);

    void deleteUser(String username, DeleteUserRequestDto requestDto);

}
