package com.haloomin.goal.user.entity;

import com.haloomin.goal.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class UserAuth extends BaseEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "user_auth_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Column(unique = true, nullable = false, length = 30)
    private String username;

    @Column(nullable = false, length = 60)
    private String password;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    @Column(nullable = false, length = 10)
    private UserRole role;

    @Builder
    public UserAuth(UserEntity userEntity, String username, String password, UserRole role) {
        this.userEntity = userEntity;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public void changePassword(String newPassword) {
        this.password = newPassword;
    }
}
