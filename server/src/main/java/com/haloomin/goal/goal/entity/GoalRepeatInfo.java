package com.haloomin.goal.goal.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.MonthDay;

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
    private MonthDay yearRepeat;

    // 날짜 지정
    private LocalDate dateRepeat;

    @Builder
    public GoalRepeatInfo(
            Goal goal,
            WeekType weekRepeatType,
            Integer monthRepeatNum,
            MonthDay yearRepeat,
            LocalDate dateRepeat
    ) {
        this.goal = goal;
        this.weekRepeatType = weekRepeatType;
        this.monthRepeatNum = monthRepeatNum;
        this.yearRepeat = yearRepeat;
        this.dateRepeat = dateRepeat;
    }
}
