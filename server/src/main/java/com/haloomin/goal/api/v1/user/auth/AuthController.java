package com.haloomin.goal.api.v1.user.auth;

import com.haloomin.goal.api.v1.user.auth.docs.AuthControllerDocs;
import com.haloomin.goal.api.v1.user.auth.dto.SignInRequestDto;
import com.haloomin.goal.api.v1.user.auth.dto.SignInResponseDto;
import com.haloomin.goal.api.v1.user.auth.dto.SignUpRequestDto;
import com.haloomin.goal.global.dto.ResponseDto;
import com.haloomin.goal.global.util.JwtUtil;
import com.haloomin.goal.user.service.UserAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/v1/user/auth")
@RestController
public class AuthController implements AuthControllerDocs {

    private final UserAuthService userAuthService;

    @PostMapping("/signup")
    public ResponseEntity<ResponseDto<Void>> signUp(@Valid @RequestBody SignUpRequestDto dto) {
        userAuthService.signUp(dto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseDto.success(null));
    }

    @PostMapping("/signin")
    public ResponseEntity<ResponseDto<SignInResponseDto>> signIn(@Valid @RequestBody SignInRequestDto dto) {
        SignInResponseDto responseDto = userAuthService.signIn(dto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ResponseDto.success(responseDto));
    }
}
