package com.haloomin.goal.security;

import com.haloomin.goal.global.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@Slf4j
@TestPropertySource(properties = {
        "jwt.secretKey=localtestsecretkey-localtestsecretkey-localtestsecretkey",
        "jwt.accessTokenExpireTime=1800",
        "jwt.refreshTokenExpireTime=1209600"
    }
)
@SpringBootTest
class JwtUtilTest {

    @Autowired
    private JwtUtil jwtUtil;

    @Test
    void createAccessToken() {
        String accessToken = jwtUtil.createAccessToken("test1", "USER");
        log.info("accessToken: {}", accessToken);
    }
}