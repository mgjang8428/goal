package com.haloomin.goal.user.dto.auth.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SignInRequestDto(
        @NotNull
        @Size(min = 3, max = 30)
        String username,

        @NotNull
        @Size(min = 5, max = 50)
        String password
) {
}
