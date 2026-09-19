package com.haloomin.goal.goal.dto.request;

import com.haloomin.goal.goal.entity.RepeatType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record UpdateGoalRequestDto(
        @NotNull
        @Size(min = 1, max = 100)
        String title,
        @Size(max = 3000)
        String content,
        @NotNull
        Boolean isActive,
        @NotNull
        LocalDate startDate,
        LocalDate endDate,
        @NotNull
        RepeatType repeatType,
        List<RepeatInfoRequestDto> repeatInfo
) {
}
