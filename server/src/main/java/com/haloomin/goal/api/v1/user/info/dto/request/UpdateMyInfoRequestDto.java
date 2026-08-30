package com.haloomin.goal.api.v1.user.info.dto.request;

public record UpdateMyInfoRequestDto(
        UpdateMyInfoRequestType updateMyInfoRequestType,
        String nowPassword,
        String newPassword,
        String name,
        String email
) {
}
