package com.haloomin.goal.user.service.impl;

import com.haloomin.goal.api.v1.user.info.dto.request.DeleteUserRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.request.SignUpRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.request.UpdateMyInfoRequestDto;
import com.haloomin.goal.api.v1.user.info.dto.request.UpdateMyInfoRequestType;
import com.haloomin.goal.api.v1.user.info.dto.response.MyInfoResponseDto;
import com.haloomin.goal.user.entity.UserAuth;
import com.haloomin.goal.user.entity.UserEntity;
import com.haloomin.goal.user.entity.UserRefreshToken;
import com.haloomin.goal.user.entity.UserRole;
import com.haloomin.goal.user.repository.UserAuthJpaRepository;
import com.haloomin.goal.user.repository.UserEntityJpaRepository;
import com.haloomin.goal.user.repository.UserRefreshTokenJpaRepository;
import com.haloomin.goal.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserEntityJpaRepository userEntityJpaRepository;
    private final UserAuthJpaRepository userAuthJpaRepository;
    private final UserRefreshTokenJpaRepository userRefreshTokenJpaRepository;

    // SpringSecurity: username으로 user 정보 조회
    @SuppressWarnings("NullableProblems")
    @Override
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        UserAuth userAuth = userAuthJpaRepository.findByUsernameAndDeletedAtIsNull(username)
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

    @Override
    public MyInfoResponseDto getMyInfo(String username) {
        UserAuth userAuth = userAuthJpaRepository.findByUsernameAndDeletedAtIsNull(username)
                .orElseThrow(IllegalArgumentException::new);
        UserEntity userEntity = userAuth.getUserEntity();

        return MyInfoResponseDto.builder()
                .username(username)
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .build();
    }

    @Transactional
    @Override
    public void updateMyInfo(String username, UpdateMyInfoRequestDto requestDto) {
        UserAuth userAuth = userAuthJpaRepository.findByUsernameAndDeletedAtIsNull(username)
                .orElseThrow(IllegalArgumentException::new);

        UpdateMyInfoRequestType updateType = requestDto.updateMyInfoRequestType();

        switch (updateType) {
            case PASSWORD -> {
                if (passwordEncoder.matches(requestDto.nowPassword(), userAuth.getPassword())) {
                    userAuth.changePassword(passwordEncoder.encode(requestDto.newPassword()));
                } else {
                    throw new IllegalArgumentException();
                }
            }
            case NAME -> {
                userAuth.getUserEntity().changeName(requestDto.name());
            }
            case EMAIL -> {
                userAuth.getUserEntity().changeEmail(requestDto.email());

            }
            case null, default -> {
                throw new IllegalArgumentException();
            }
        }
    }

    @Transactional
    @Override
    public void deleteUser(String username, DeleteUserRequestDto requestDto) {
        UserAuth userAuth = userAuthJpaRepository.findByUsernameAndDeletedAtIsNull(username)
                .orElseThrow(IllegalArgumentException::new);
        UserEntity userEntity = userAuth.getUserEntity();

        // 비밀번호 비일치 시 에러
        if (!passwordEncoder.matches(requestDto.password(), userAuth.getPassword())) {
            throw new IllegalArgumentException();
        }

        // 유저 soft delete
        userAuth.softDelete();
        userEntity.softDelete();

        // refresh Token 비활성화
        List<UserRefreshToken> refreshTokens = userRefreshTokenJpaRepository.findByUserEntityAndDeletedAtIsNull(userEntity);
        for (UserRefreshToken refreshToken : refreshTokens) {
            refreshToken.softDelete();
        }
    }
}
