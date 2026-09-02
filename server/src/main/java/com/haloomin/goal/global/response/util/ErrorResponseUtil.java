package com.haloomin.goal.global.response.util;

import com.haloomin.goal.global.response.dto.ResponseDto;
import com.haloomin.goal.global.response.dto.ResponseDtoError;
import com.haloomin.goal.global.response.error.ErrorResponseType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public final class ErrorResponseUtil {

    public ResponseEntity<ResponseDto<Void>> badRequestErrorResponse(ErrorResponseType type) {
        return makeErrorResponseEntity(type, HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<ResponseDto<Void>> unauthorizedErrorResponse(ErrorResponseType type) {
        return makeErrorResponseEntity(type, HttpStatus.UNAUTHORIZED);
    }

    public ResponseEntity<ResponseDto<Void>> forbiddenErrorResponse(ErrorResponseType type) {
        return makeErrorResponseEntity(type, HttpStatus.FORBIDDEN);
    }

    private ResponseEntity<ResponseDto<Void>> makeErrorResponseEntity(ErrorResponseType type, HttpStatus status) {
        ResponseDtoError errorDto = ResponseDtoError.builder()
                .code(type.getCode())
                .message(type.getMessage())
                .build();
        ResponseDto<Void> responseDto = ResponseDto.<Void>builder()
                .error(errorDto)
                .build();
        return ResponseEntity
                .status(status)
                .body(responseDto);
    }
}
