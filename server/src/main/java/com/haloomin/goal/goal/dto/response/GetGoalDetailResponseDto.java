package com.haloomin.goal.goal.dto.response;

import java.time.LocalDateTime;

public record GetGoalDetailResponseDto(
        Long goalId,
        String title,
        String content,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
