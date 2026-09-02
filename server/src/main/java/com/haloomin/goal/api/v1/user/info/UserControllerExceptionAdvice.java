package com.haloomin.goal.api.v1.user.info;

import com.haloomin.goal.global.response.dto.ResponseDto;
import com.haloomin.goal.global.response.error.ErrorResponseType;
import com.haloomin.goal.global.response.util.ErrorResponseUtil;
import com.haloomin.goal.user.exception.IllegalUpdateTypeException;
import com.haloomin.goal.user.exception.IncorrectPasswordException;
import com.haloomin.goal.user.exception.NotFoundUsernameException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@SuppressWarnings("unused")
@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice(assignableTypes = {UserController.class})
public class UserControllerExceptionAdvice {

    private final ErrorResponseUtil errorResponseUtil;

    @ExceptionHandler(IllegalUpdateTypeException.class)
    ResponseEntity<ResponseDto<Void>> illegalUpdateTypeException(IllegalUpdateTypeException e, HttpServletRequest request) {

        log.info("updateType: {}, URI: {}", e.getMessage(), request.getRequestURI());

        return errorResponseUtil.badRequestErrorResponse(ErrorResponseType.ILLEGAL_USER_INFO_UPDATE_TYPE_ERROR);
    }

    @ExceptionHandler(IncorrectPasswordException.class)
    ResponseEntity<ResponseDto<Void>> incorrectPasswordException(HttpServletRequest request) {

        log.info("URI: {}", request.getRequestURI());

        return errorResponseUtil.badRequestErrorResponse(ErrorResponseType.INCORRECT_USER_PASSWORD_ERROR);
    }

    @ExceptionHandler(NotFoundUsernameException.class)
    ResponseEntity<ResponseDto<Void>> notFoundUsernameException(HttpServletRequest request) {

        log.info("URI: {}", request.getRequestURI());

        return errorResponseUtil.badRequestErrorResponse(ErrorResponseType.NOT_FOUND_USERNAME_ERROR);
    }
}
