package com.haloomin.goal.user.entity;

import com.haloomin.goal.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class UserEntity extends BaseEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "user_id")
    Long id;

    @Column(nullable = false, length = 30)
    String name;

    @Column(length = 100)
    String email;

    @OneToOne(mappedBy = "userEntity")
    UserAuth userAuth;

    @OneToMany(mappedBy = "userEntity")
    List<UserRefreshToken> userRefreshTokens;

    @Builder
    public UserEntity(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public void changeName(String newName) {
        this.name = newName;
    }

    public void changeEmail(String newEmail) {
        this.email = newEmail;
    }
}
