package com.haloomin.goal.user.entity;

import com.haloomin.goal.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class UserRefreshToken extends BaseEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "user_refreshtoken_id")
    private Long id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private Date expiresAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userEntity;

    @Builder
    public UserRefreshToken(String token, Date expiresAt, UserEntity userEntity) {
        this.token = token;
        this.expiresAt = expiresAt;
        this.userEntity = userEntity;
    }
}
