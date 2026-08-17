package com.haloomin.goal.user.service.impl;

import com.haloomin.goal.api.v1.user.auth.dto.SignInRequestDto;
import com.haloomin.goal.api.v1.user.auth.dto.SignUpRequestDto;
import com.haloomin.goal.global.util.JwtUtil;
import com.haloomin.goal.user.entity.UserAuth;
import com.haloomin.goal.user.entity.UserEntity;
import com.haloomin.goal.user.entity.UserRole;
import com.haloomin.goal.user.repository.UserAuthJpaRepository;
import com.haloomin.goal.user.repository.UserEntityJpaRepository;
import com.haloomin.goal.user.service.UserAuthService;
import com.haloomin.goal.user.service.dto.AuthTokens;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserAuthServiceImpl implements UserAuthService {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    private final UserEntityJpaRepository userEntityJpaRepository;
    private final UserAuthJpaRepository userAuthJpaRepository;

    /**
     * 유저 서비스 가입
     *
     * @param dto 가입요청 RequestDto
     */
    @Override
    public void signUp(SignUpRequestDto dto) {
        // user 애그리거트 저장
        UserEntity userEntity = UserEntity.builder()
                .name(dto.name())
                .email(dto.email())
                .build();
        UserEntity savedUser = userEntityJpaRepository.save(userEntity);

        // userAuth 저장
        UserAuth userAuth = UserAuth.builder()
                .userEntity(savedUser)
                .username(dto.username())
                .password(passwordEncoder.encode(dto.password()))
                .role(UserRole.USER)
                .build();
        userAuthJpaRepository.save(userAuth);
    }

    /**
     * 유저 로그인
     *
     * @param dto 로그인 요청 RequestDto
     * @return 로그인 성공, 생성된 인증 토큰(accessToken, refreshToken)
     */
    @Override
    public AuthTokens signIn(SignInRequestDto dto) {
        // 사용자 일치 확인 (로그인 정보 확인)
        UsernamePasswordAuthenticationToken authenticationToken =
                UsernamePasswordAuthenticationToken.unauthenticated(dto.username(), dto.password());
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);

        // accessToken, refreshToken 발행
        String username = authenticate.getName();
        String role = authenticate.getAuthorities().iterator().next().getAuthority();

        String accessToken = jwtUtil.createAccessToken(username, role);
        String refreshToken = jwtUtil.createRefreshToken(username, role);

        return new AuthTokens(accessToken, refreshToken);
    }
}
