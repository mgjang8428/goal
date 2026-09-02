package com.haloomin.goal.api.v1.user.info.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record DeleteUserRequestDto(
        @NotNull
        @Size(min = 5, max = 50)
        String password
) {
}
