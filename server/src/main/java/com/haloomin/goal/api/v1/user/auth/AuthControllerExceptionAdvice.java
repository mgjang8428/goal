package com.haloomin.goal.api.v1.user.auth;

import com.haloomin.goal.global.dto.ResponseDto;
import com.haloomin.goal.global.dto.ResponseDtoError;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@SuppressWarnings("unused")
@RequiredArgsConstructor
@RestControllerAdvice(assignableTypes = {AuthController.class})
public class AuthControllerExceptionAdvice {

    @ExceptionHandler(RuntimeException.class)
    ResponseEntity<ResponseDto<Void>> unspecifiedException(RuntimeException e) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ResponseDto.serverFail(ResponseDtoError.serverFailed()));
    }
}
