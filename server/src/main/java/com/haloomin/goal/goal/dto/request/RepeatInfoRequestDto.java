package com.haloomin.goal.goal.dto.request;

import com.haloomin.goal.goal.entity.WeekType;

import java.time.LocalDate;
import java.time.MonthDay;

public record RepeatInfoRequestDto(
        WeekType weekRepeatType,
        Integer monthRepeatNum,
        MonthDay yearRepeat,
        LocalDate dateRepeat
) {

}
