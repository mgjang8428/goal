package com.haloomin.goal.user.dto.user.response;

import lombok.Builder;

@Builder
public record MyInfoResponseDto(
        String username,
        String name,
        String email
) {
}
