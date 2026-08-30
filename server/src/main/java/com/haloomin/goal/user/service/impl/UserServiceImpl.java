package com.haloomin.goal.user.service.impl;

import com.haloomin.goal.api.v1.user.info.dto.request.SignUpRequestDto;
import com.haloomin.goal.user.entity.UserAuth;
import com.haloomin.goal.user.entity.UserEntity;
import com.haloomin.goal.user.entity.UserRole;
import com.haloomin.goal.user.repository.UserAuthJpaRepository;
import com.haloomin.goal.user.repository.UserEntityJpaRepository;
import com.haloomin.goal.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserEntityJpaRepository userEntityJpaRepository;
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

    /**
     * 유저 서비스 가입
     *
     * @param requestDto 가입요청 RequestDto
     */
    @Transactional
    @Override
    public void signUp(SignUpRequestDto requestDto) {
        // user 애그리거트 저장
        UserEntity userEntity = UserEntity.builder()
                .name(requestDto.name())
                .email(requestDto.email())
                .build();
        UserEntity savedUser = userEntityJpaRepository.save(userEntity);

        // userAuth 저장
        UserAuth userAuth = UserAuth.builder()
                .userEntity(savedUser)
                .username(requestDto.username())
                .password(passwordEncoder.encode(requestDto.password()))
                .role(UserRole.USER)
                .build();
        userAuthJpaRepository.save(userAuth);
    }
}
