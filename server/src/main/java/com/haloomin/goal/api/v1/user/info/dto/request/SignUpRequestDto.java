package com.haloomin.goal.api.v1.user.info.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SignUpRequestDto(
        @NotNull
        @Size(min = 3, max = 30)
        String username,

        @NotNull
        @Size(min = 5, max = 50)
        String password,

        @NotNull
        @Size(min = 3, max = 30)
        String name,

        @Email
        @Size(max = 100)
        String email
) {
}
