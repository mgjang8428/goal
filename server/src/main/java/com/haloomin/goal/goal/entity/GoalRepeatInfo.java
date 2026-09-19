package com.haloomin.goal.goal.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class GoalRepeatInfo {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "goal_repeat_info_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "goal_id", nullable = false)
    private Goal goal;

    // 주간 반복 정보
    @Enumerated(EnumType.STRING)
    private WeekType weekRepeatType;

    // 월간 반복 정보
    private Integer monthRepeatNum;

    // 연간 반복 정보
    private Integer yearRepeatMonth;
    private Integer yearRepeatDate;

    // 날짜 지정
    private LocalDate selectRepeat;

    @Builder
    public GoalRepeatInfo(
            Goal goal,
            WeekType weekRepeatType,
            Integer monthRepeatNum,
            Integer yearRepeatMonth,
            Integer yearRepeatDate,
            LocalDate selectRepeat
    ) {
        this.goal = goal;
        this.weekRepeatType = weekRepeatType;
        this.monthRepeatNum = monthRepeatNum;
        this.yearRepeatMonth = yearRepeatMonth;
        this.yearRepeatDate = yearRepeatDate;
        this.selectRepeat = selectRepeat;
    }
}
