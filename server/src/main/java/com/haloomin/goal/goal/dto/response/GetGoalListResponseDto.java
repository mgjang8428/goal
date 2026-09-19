package com.haloomin.goal.goal.dto.response;

import com.haloomin.goal.goal.entity.RepeatType;

public record GetGoalListResponseDto(
        Long goalId,
        String title,
        Boolean isActive,
        RepeatType repeatType
) {
}
