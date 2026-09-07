package com.haloomin.goal.user.dto.user.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record DeleteUserRequestDto(
        @NotNull
        @Size(min = 5, max = 50)
        String password
) {
}
