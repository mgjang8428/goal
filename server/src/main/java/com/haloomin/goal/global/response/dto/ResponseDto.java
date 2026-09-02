package com.haloomin.goal.global.response.dto;

import jakarta.annotation.Nullable;
import lombok.Builder;

import java.time.LocalDateTime;

public record ResponseDto<T>(
        LocalDateTime timestamp,
        @Nullable
        T dto,
        @Nullable
        ResponseDtoError error
) {

    @Builder
    public ResponseDto {
        if (timestamp == null) {
            timestamp = LocalDateTime.now();
        }
    }
}
