package com.haloomin.goal.user.service.impl;

import com.haloomin.goal.user.entity.UserAuth;
import com.haloomin.goal.user.repository.UserAuthJpaRepository;
import com.haloomin.goal.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserAuthJpaRepository userAuthJpaRepository;

    // SpringSecurity: username으로 user 정보 조회
    @SuppressWarnings("NullableProblems")
    @Override
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        UserAuth userAuth = userAuthJpaRepository.findByUsername(username)
                .orElseThrow(IllegalArgumentException::new);
        return User.builder()
                .username(userAuth.getUsername())
                .password(userAuth.getPassword())
                .roles(userAuth.getRole().name())
                .build();
    }
}
