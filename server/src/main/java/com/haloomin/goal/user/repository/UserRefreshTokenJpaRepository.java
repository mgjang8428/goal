package com.haloomin.goal.user.repository;

import com.haloomin.goal.user.entity.UserEntity;
import com.haloomin.goal.user.entity.UserRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRefreshTokenJpaRepository extends JpaRepository<UserRefreshToken, Long> {
    Optional<UserRefreshToken> findByToken(String refreshToken);

    List<UserRefreshToken> findByUserEntityAndDeletedAtIsNull(UserEntity userEntity);
}
