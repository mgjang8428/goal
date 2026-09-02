package com.haloomin.goal.global.response.dto;

import lombok.Builder;

// TODO: 응답 구체화 구현 필요!!
public record ResponseDtoError(
        String code,
        String message
) {
    @Builder
    public ResponseDtoError {
    }
}
