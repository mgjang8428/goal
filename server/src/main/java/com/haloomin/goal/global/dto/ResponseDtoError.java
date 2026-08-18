package com.haloomin.goal.global.dto;

import lombok.Builder;

import java.time.LocalDateTime;

public record ResponseDtoError(
        int code,
        String message,
        LocalDateTime timestamp
) {
    @Builder
    public ResponseDtoError {
    }

    public static ResponseDtoError clientFailed() {
        return ResponseDtoError.builder()
                .code(400)
                .message("정의 되지 않은 클라이언트 오류")
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static ResponseDtoError serverFailed() {
        return ResponseDtoError.builder()
                .code(500)
                .message("정의 되지 않은 서버 오류")
                .timestamp(LocalDateTime.now())
                .build();
    }
}
