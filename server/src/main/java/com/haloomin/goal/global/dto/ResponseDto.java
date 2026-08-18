package com.haloomin.goal.global.dto;

import jakarta.annotation.Nullable;
import lombok.Builder;

import java.time.LocalDateTime;

public record ResponseDto<T>(
        boolean isSuccess,
        int code,
        String message,
        LocalDateTime timestamp,
        @Nullable
        T data,
        @Nullable
        ResponseDtoError error
) {

    @Builder
    public ResponseDto {
    }

    public static <T> ResponseDto<T> success(@Nullable final T data) {
        return ResponseDto.<T>builder()
                .isSuccess(true)
                .code(200)
                .message("성공")
                .timestamp(LocalDateTime.now())
                .data(data)
                .error(null)
                .build();
    }

    public static <T> ResponseDto<T> serverFail(ResponseDtoError error) {
        return ResponseDto.<T>builder()
                .isSuccess(false)
                .code(500)
                .message("서버 오류")
                .timestamp(LocalDateTime.now())
                .data(null)
                .error(error)
                .build();
    }

    public static <T> ResponseDto<T> clientFail(ResponseDtoError error) {
        return ResponseDto.<T>builder()
                .isSuccess(false)
                .code(400)
                .message("클라이언트 오류")
                .timestamp(LocalDateTime.now())
                .data(null)
                .error(error)
                .build();
    }
}
