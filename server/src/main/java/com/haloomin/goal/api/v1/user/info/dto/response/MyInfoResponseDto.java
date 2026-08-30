package com.haloomin.goal.api.v1.user.info.dto.response;

import lombok.Builder;

@Builder
public record MyInfoResponseDto(
        String username,
        String name,
        String email
) {
}
