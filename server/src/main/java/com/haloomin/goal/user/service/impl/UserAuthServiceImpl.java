package com.haloomin.goal.user.service.impl;

import com.haloomin.goal.api.v1.user.auth.dto.request.SignInRequestDto;
import com.haloomin.goal.config.security.jwt.JwtTokenProvider;
import com.haloomin.goal.user.entity.UserAuth;
import com.haloomin.goal.user.entity.UserEntity;
import com.haloomin.goal.user.entity.UserRefreshToken;
import com.haloomin.goal.user.exception.IncorrectRefreshTokenUsernameException;
import com.haloomin.goal.user.exception.NotFoundUserRefreshTokenException;
import com.haloomin.goal.user.exception.NotFoundUsernameException;
import com.haloomin.goal.user.repository.UserAuthJpaRepository;
import com.haloomin.goal.user.repository.UserRefreshTokenJpaRepository;
import com.haloomin.goal.user.service.UserAuthService;
import com.haloomin.goal.user.service.UserService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class UserAuthServiceImpl implements UserAuthService {

    private final UserService userService;
    private final UserAuthJpaRepository userAuthJpaRepository;
    private final UserRefreshTokenJpaRepository userRefreshTokenJpaRepository;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;


    /**
     * 유저 로그인
     *
     * @param dto 로그인 요청 RequestDto
     * @return 로그인 성공, 생성된 인증 토큰(accessToken, refreshToken)
     */
    @Transactional
    @Override
    public Map<String, String> signIn(SignInRequestDto dto) {
        // 사용자 일치 확인 (로그인 정보 확인)
        UsernamePasswordAuthenticationToken authenticationToken =
                UsernamePasswordAuthenticationToken.unauthenticated(dto.username(), dto.password());
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);

        // accessToken, refreshToken 발행
        String accessToken = jwtTokenProvider.createAccessToken(authenticate);
        String refreshToken = jwtTokenProvider.createRefreshToken(authenticate);

        // refreshToken 저장
        UserAuth userAuth = userAuthJpaRepository.findByUsernameAndDeletedAtIsNull(authenticate.getName())
                .orElseThrow(NotFoundUsernameException::new);
        UserEntity userEntity = userAuth.getUserEntity();
        UserRefreshToken userRefreshToken = UserRefreshToken.builder()
                .token(refreshToken).
                expiresAt(jwtTokenProvider.getClaims(refreshToken).getExpiration()).
                userEntity(userEntity).
                build();
        userRefreshTokenJpaRepository.save(userRefreshToken);

        Map<String, String> result = new HashMap<>();
        result.put("accessToken", accessToken);
        result.put("refreshToken", refreshToken);

        return result;
    }

    @Transactional
    @Override
    public void signOut(String refreshToken) {
        UserRefreshToken userRefreshToken = userRefreshTokenJpaRepository.findByTokenAndDeletedAtIsNull(refreshToken)
                .orElseThrow(NotFoundUserRefreshTokenException::new);
        userRefreshToken.softDelete();
    }

    @Transactional
    @Override
    public Map<String, String> reissue(String refreshToken) {
        // RefreshToken 검증 및 내용 추출
        Claims claims = jwtTokenProvider.validateUserRefreshToken(refreshToken);
        String username = claims.getSubject();

        // DB RefreshToken 검증
        UserRefreshToken userRefreshToken = userRefreshTokenJpaRepository.findByTokenAndDeletedAtIsNull(refreshToken)
                .orElseThrow(NotFoundUserRefreshTokenException::new);

        // username 일치 확인
        String dbRefreshTokenUsername = userRefreshToken.getUserEntity().getUserAuth().getUsername();
        if (!dbRefreshTokenUsername.equals(username)) {
            throw new IncorrectRefreshTokenUsernameException();
        }

        // accessToken, refreshToken 재발급
        UserDetails userDetails = userService.loadUserByUsername(username);
        Authentication authenticate = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        String newAccessToken = jwtTokenProvider.createAccessToken(authenticate);
        String newRefreshToken = jwtTokenProvider.createRefreshToken(authenticate);

        // 기존 RefreshToken 삭제
        userRefreshToken.softDelete();
        // 새 RefreshToken 저장
        UserAuth userAuth = userAuthJpaRepository.findByUsernameAndDeletedAtIsNull(username)
                .orElseThrow(NotFoundUsernameException::new);
        UserEntity userEntity = userAuth.getUserEntity();
        UserRefreshToken newUserRefreshToken = UserRefreshToken.builder()
                .token(newRefreshToken)
                .expiresAt(jwtTokenProvider.getClaims(newRefreshToken).getExpiration())
                .userEntity(userEntity)
                .build();
        userRefreshTokenJpaRepository.save(newUserRefreshToken);

        Map<String, String> result = new HashMap<>();
        result.put("accessToken", newAccessToken);
        result.put("refreshToken", newRefreshToken);
        // dto return
        return result;
    }
}
