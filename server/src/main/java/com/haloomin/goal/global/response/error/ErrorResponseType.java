package com.haloomin.goal.global.response.error;

import lombok.Getter;

@Getter
public enum ErrorResponseType {
    CLIENT_ERROR("E0001", "정의되지 않은 클라이언트 에러"),
    SERVER_ERROR("E0002", "정의되지 않은 서버 에러"),

    //USER ERROR
    ILLEGAL_USER_INFO_UPDATE_TYPE_ERROR("E1001", "변경타입이 미지정 되었거나 없는 타입입니다."),
    INCORRECT_USER_PASSWORD_ERROR("E1002", "비밀번호가 틀립니다."),
    NOT_FOUND_USERNAME_ERROR("E1003", "아이디가 틀립니다."),

    //AUTH ERROR
    BAD_CREDENTIALS_ERROR("E1101", "인증 실패"),
    ACCESS_DENIED_ERROR("E1102", "접근 권한 없음"),
    SECURITY_UNAUTHORIZED_ERROR("E1103", "시큐리티 인증 실패"),
    SECURITY_FORBIDDEN_ERROR("E1104", "시큐리티 권한 없음")
    ;

    private final String code;
    private final String message;

    ErrorResponseType(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
