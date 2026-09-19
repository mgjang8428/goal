package com.haloomin.goal.api.common.exceptionadvice;

import com.haloomin.goal.api.v1.user.auth.AuthController;
import com.haloomin.goal.global.response.dto.ResponseDto;
import com.haloomin.goal.global.response.error.ErrorResponseType;
import com.haloomin.goal.global.response.util.ErrorResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@SuppressWarnings("unused")
@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice(basePackages = "com.haloomin.goal.api")
public class ApiCommonExceptionAdvice {

    private final ErrorResponseUtil errorResponseUtil;

    @ExceptionHandler(Exception.class)
    ResponseEntity<ResponseDto<Void>> undefinedException(Exception e) {
        log.warn("error: ", e);
        return errorResponseUtil.undefinedErrorResponse(ErrorResponseType.CLIENT_ERROR);
    }
}