package com.haloomin.goal.goal.repository;

import com.haloomin.goal.goal.entity.Goal;
import com.haloomin.goal.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalJpaRepository extends JpaRepository<Goal, Long> {

    List<Goal> findByUserEntityAndDeletedAtIsNull(UserEntity userEntity);
}
