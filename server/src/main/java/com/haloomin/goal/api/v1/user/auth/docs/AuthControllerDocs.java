package com.haloomin.goal.api.v1.user.auth.docs;

import com.haloomin.goal.api.v1.user.auth.dto.SignInRequestDto;
import com.haloomin.goal.api.v1.user.auth.dto.SignUpRequestDto;
import com.haloomin.goal.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@SuppressWarnings("unused")
@Tag(name = "유저계정 인증 API")
public interface AuthControllerDocs {

    @Operation(
            summary = "유저계정가입",
            description = "유저계정가입 API"
    )
    public ResponseEntity<ResponseDto<Void>> signUp(@Valid @RequestBody SignUpRequestDto dto);

    @Operation(
            summary = "유저계정로그인",
            description = "유저계정로그인 API"
    )
    public ResponseEntity<ResponseDto<Void>> signIn(@Valid @RequestBody SignInRequestDto dto);
}
