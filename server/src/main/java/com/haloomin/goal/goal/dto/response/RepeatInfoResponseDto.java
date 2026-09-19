package com.haloomin.goal.goal.dto.response;

import com.haloomin.goal.goal.entity.WeekType;

import java.time.LocalDate;

public record RepeatInfoResponseDto(
        WeekType weekRepeatType,
        Integer monthRepeatNum,
        Integer yearRepeatMonth,
        Integer yearRepeatDate,
        LocalDate selectRepeat
) {
}
