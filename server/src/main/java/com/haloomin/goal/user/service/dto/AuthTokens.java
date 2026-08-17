package com.haloomin.goal.user.service.dto;

public record AuthTokens(
        String accessToken,
        String refreshToken
) {}
