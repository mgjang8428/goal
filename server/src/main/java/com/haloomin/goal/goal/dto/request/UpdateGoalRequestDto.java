package com.haloomin.goal.goal.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateGoalRequestDto(
        @NotNull
        @Size(min = 1, max = 100)
        String title,
        @Size(max = 3000)
        String content
) {
}
