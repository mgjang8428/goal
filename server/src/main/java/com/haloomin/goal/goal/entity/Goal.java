package com.haloomin.goal.goal.entity;

import com.haloomin.goal.global.entity.BaseEntity;
import com.haloomin.goal.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Goal extends BaseEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "goal_id")
    private Long id;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 3000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userEntity;

    // 반복 시작일
    @Column(nullable = false)
    private LocalDateTime startDateTime;

    // 반복 끝일 (null 시 무한 반복)
    private LocalDateTime endDateTime;

    // 반복 타입
    @Enumerated(EnumType.STRING)
    private RepeatType repeatType;

    @OneToMany(mappedBy = "goal")
    private List<GoalRepeatInfo> goalRepeatInfoList;

    @Builder
    public Goal(
            String title,
            String content,
            UserEntity userEntity,
            LocalDate startDate,
            LocalDate endDate,
            RepeatType repeatType
    ) {
        this.title = title;
        this.content = content;
        this.userEntity = userEntity;
        this.startDateTime = startDate.atStartOfDay();
        this.endDateTime = endDate.atTime(LocalTime.MAX);
        this.repeatType = repeatType;
    }

    public void updateTitle(String title) {
        this.title = title;
    }

    public void updateContent(String content) {
        this.content = content;
    }
}
