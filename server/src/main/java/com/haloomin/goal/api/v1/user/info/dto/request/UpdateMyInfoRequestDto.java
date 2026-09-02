package com.haloomin.goal.api.v1.user.info.dto.request;

import jakarta.validation.constraints.NotNull;

public record UpdateMyInfoRequestDto(
        @NotNull
        UpdateMyInfoRequestType type,
        String nowPassword,
        String newPassword,
        String name,
        String email
) {
}
