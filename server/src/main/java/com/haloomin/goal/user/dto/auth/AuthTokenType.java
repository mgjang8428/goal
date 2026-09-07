package com.haloomin.goal.user.dto.auth;

import lombok.Getter;

public enum AuthTokenType {
    ACCESS_TOKEN("accessToken", "/"),
    REFRESH_TOKEN("refreshToken", "/");

    @Getter
    private final String tokenName;
    @Getter
    private final String allowPath;

    AuthTokenType(String tokenName, String allowPath) {
        this.tokenName = tokenName;
        this.allowPath = allowPath;
    }
}
