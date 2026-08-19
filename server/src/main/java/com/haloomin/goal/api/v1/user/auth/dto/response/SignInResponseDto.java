package com.haloomin.goal.api.v1.user.auth.dto.response;

public record SignInResponseDto(
        String accessToken,
        String refreshToken
) {
}
