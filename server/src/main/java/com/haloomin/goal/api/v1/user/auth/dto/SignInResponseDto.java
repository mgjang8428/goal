package com.haloomin.goal.api.v1.user.auth.dto;

public record SignInResponseDto(
        String accessToken,
        String refreshToken
) {
}
