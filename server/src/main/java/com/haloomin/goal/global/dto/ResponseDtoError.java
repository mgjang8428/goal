package com.haloomin.goal.global.dto;

import lombok.Builder;

import java.time.LocalDateTime;

// TODO: 응답 구체화 구현 필요!!
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

    public static ResponseDtoError unauthorized() {
        return ResponseDtoError.builder()
                .code(401)
                .message("인증실패 또는 인증만료")
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
