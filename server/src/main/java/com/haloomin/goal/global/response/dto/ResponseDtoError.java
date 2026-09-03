package com.haloomin.goal.global.response.dto;

import lombok.Builder;

public record ResponseDtoError(
        String code,
        String message
) {
    @Builder
    public ResponseDtoError {
    }
}
