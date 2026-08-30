package com.haloomin.goal.api.v1.user.info.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SignUpRequestDto(
        @NotNull
        @Size(max = 30)
        String username,

        @NotNull
        @Size(max = 50)
        String password,

        @NotNull
        @Size(max = 30)
        String name,

        @Size(max = 100)
        String email
) {
}
