package com.haloomin.goal.api.v1.user.auth.dto.request;

import jakarta.validation.constraints.NotNull;

public record ReissueRequestDto(
        @NotNull
        String refreshToken
) {
}
