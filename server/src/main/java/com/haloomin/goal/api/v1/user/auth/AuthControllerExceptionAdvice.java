package com.haloomin.goal.api.v1.user.auth;

import com.haloomin.goal.global.response.dto.ResponseDto;
import com.haloomin.goal.global.response.error.ErrorResponseType;
import com.haloomin.goal.global.response.util.ErrorResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@SuppressWarnings("unused")
@RequiredArgsConstructor
@RestControllerAdvice(assignableTypes = {AuthController.class})
public class AuthControllerExceptionAdvice {

    private final ErrorResponseUtil errorResponseUtil;

    @ExceptionHandler(BadCredentialsException.class)
    ResponseEntity<ResponseDto<Void>> badCredentialsException(BadCredentialsException e) {
        return errorResponseUtil.unauthorizedErrorResponse(ErrorResponseType.BAD_CREDENTIALS_ERROR);
    }

    // TODO: MethodArgumentNotValidException 구현 필요!!
//    SecurityException | MalformedJwtException
//    -> Invalid JWT Token
//    ExpiredJwtException
//    -> Expired JWT Token
//    UnsupportedJwtException
//    -> Unsupported JWT Token
//    IllegalArgumentException
//    -> JWT claims string is empty
}
