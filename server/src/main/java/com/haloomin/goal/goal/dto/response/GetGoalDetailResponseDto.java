package com.haloomin.goal.goal.dto.response;

import com.haloomin.goal.goal.dto.request.RepeatInfoRequestDto;
import com.haloomin.goal.goal.entity.RepeatType;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record GetGoalDetailResponseDto(
        Long goalId,
        String title,
        String content,

        Boolean isActive,
        LocalDate startDate,
        LocalDate endDate,
        RepeatType repeatType,
        List<RepeatInfoResponseDto> repeatInfo,

        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
