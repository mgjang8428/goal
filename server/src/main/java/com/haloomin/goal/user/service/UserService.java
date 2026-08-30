package com.haloomin.goal.user.service;

import com.haloomin.goal.api.v1.user.info.dto.request.SignUpRequestDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    void signUp(SignUpRequestDto requestDto);
}
