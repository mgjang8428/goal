package com.haloomin.goal.api.v1.user.auth.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SignInRequestDto(
        @NotNull
        @Size(max = 30)
        String username,

        @NotNull
        @Size(max = 50)
        String password
) {
}
