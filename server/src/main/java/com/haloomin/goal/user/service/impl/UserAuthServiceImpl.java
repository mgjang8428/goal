package com.haloomin.goal.user.service.impl;

import com.haloomin.goal.api.v1.user.auth.dto.request.ReissueRequestDto;
import com.haloomin.goal.api.v1.user.auth.dto.request.SignInRequestDto;
import com.haloomin.goal.api.v1.user.auth.dto.request.SignUpRequestDto;
import com.haloomin.goal.api.v1.user.auth.dto.response.ReissueResponseDto;
import com.haloomin.goal.api.v1.user.auth.dto.response.SignInResponseDto;
import com.haloomin.goal.global.util.JwtUtil;
import com.haloomin.goal.user.entity.UserAuth;
import com.haloomin.goal.user.entity.UserEntity;
import com.haloomin.goal.user.entity.UserRefreshToken;
import com.haloomin.goal.user.entity.UserRole;
import com.haloomin.goal.user.repository.UserAuthJpaRepository;
import com.haloomin.goal.user.repository.UserEntityJpaRepository;
import com.haloomin.goal.user.repository.UserRefreshTokenJpaRepository;
import com.haloomin.goal.user.service.UserAuthService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class UserAuthServiceImpl implements UserAuthService {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    private final UserEntityJpaRepository userEntityJpaRepository;
    private final UserAuthJpaRepository userAuthJpaRepository;
    private final UserRefreshTokenJpaRepository userRefreshTokenJpaRepository;

    /**
     * 유저 서비스 가입
     *
     * @param dto 가입요청 RequestDto
     */
    @Transactional
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
    @Transactional
    @Override
    public SignInResponseDto signIn(SignInRequestDto dto) {
        // 사용자 일치 확인 (로그인 정보 확인)
        UsernamePasswordAuthenticationToken authenticationToken =
                UsernamePasswordAuthenticationToken.unauthenticated(dto.username(), dto.password());
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);

        // accessToken, refreshToken 발행
        String username = authenticate.getName();
        String role = authenticate.getAuthorities().iterator().next().getAuthority();

        String accessToken = jwtUtil.createAccessToken(username, role);
        String refreshToken = jwtUtil.createRefreshToken(username, role);

        // refreshToken 저장
        UserAuth userAuth = userAuthJpaRepository.findByUsername(username)
                .orElseThrow(IllegalArgumentException::new);
        UserEntity userEntity = userAuth.getUserEntity();
        UserRefreshToken userRefreshToken = UserRefreshToken.builder()
                .token(refreshToken).
                expiresAt(jwtUtil.getClaims(refreshToken).getExpiration()).
                userEntity(userEntity).
                build();
        userRefreshTokenJpaRepository.save(userRefreshToken);

        return new SignInResponseDto(accessToken, refreshToken);
    }

    @Transactional
    @Override
    public ReissueResponseDto reissue(ReissueRequestDto dto) {
        // token 앞 Bearer 체크
        if (!dto.refreshToken().startsWith("Bearer ")) {
            throw new RuntimeException();
        }

        // RefreshToken 추출
        String refreshToken = dto.refreshToken().replace("Bearer ", "");

        // RefreshToken 검증 및 내용 추출
        Claims claims = jwtUtil.getClaims(refreshToken);
        String username = claims.getSubject();
        String role = claims.get("role", String.class);
        String tokenType = claims.get("tokenType", String.class);
        Date expiration = claims.getExpiration();

        // TokenType 체크
        if (!"REFRESH".equals(tokenType)) {
            System.out.println("TokenType 체크");
            throw new RuntimeException();
        }

        // RefreshToken 만료 여부 확인
        Date now = new Date();
        if (expiration.before(now)) {
            System.out.println("RefreshToken 만료 여부 확인");
            throw new RuntimeException();
        }

        // DB RefreshToken 검증
        System.out.println("DB RefreshToken 검증");
        UserRefreshToken userRefreshToken = userRefreshTokenJpaRepository.findByToken(refreshToken)
                .orElseThrow(RuntimeException::new);

        // DB RefreshToken 삭제 여부 확인
        if (userRefreshToken.isDeleted()) {
            System.out.println("DB RefreshToken 삭제 여부 확인");
            throw new RuntimeException();
        }

        // username 일치 확인
        String dbRefreshTokenUsername = userRefreshToken.getUserEntity().getUserAuth().getUsername();
        if (!dbRefreshTokenUsername.equals(username)) {
            System.out.println("username 일치 확인");
            throw new RuntimeException();
        }

        // accessToken, refreshToken 재발급
        String newAccessToken = jwtUtil.createAccessToken(username, role);
        String newRefreshToken = jwtUtil.createRefreshToken(username, role);

        // 기존 RefreshToken 삭제
        userRefreshToken.softDelete();
        // 새 RefreshToken 저장
        UserAuth userAuth = userAuthJpaRepository.findByUsername(username)
                .orElseThrow(RuntimeException::new);
        UserEntity userEntity = userAuth.getUserEntity();
        UserRefreshToken newUserRefreshToken = UserRefreshToken.builder()
                .token(newRefreshToken)
                .expiresAt(jwtUtil.getClaims(newRefreshToken).getExpiration())
                .userEntity(userEntity)
                .build();
        userRefreshTokenJpaRepository.save(newUserRefreshToken);

        // dto return
        return new ReissueResponseDto(newAccessToken, newRefreshToken);
    }
}
