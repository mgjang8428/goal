package com.haloomin.goal.goal.repository;

import com.haloomin.goal.goal.entity.Goal;
import com.haloomin.goal.goal.entity.GoalRepeatInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalRepeatInfoJpaRepository extends JpaRepository<GoalRepeatInfo, Long> {
    List<GoalRepeatInfo> findByGoal(Goal goal);
}
