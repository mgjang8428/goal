package com.haloomin.goal.user.repository;

import com.haloomin.goal.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEntityJpaRepository extends JpaRepository<UserEntity, Long> {
}
