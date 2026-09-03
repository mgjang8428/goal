/**
 * api 주소 상수 모음
 */
export const apiLocale = {
    AUTH_SIGNIN: "/api/v1/user/auth/signin",
    AUTH_SIGNOUT: "/api/v1/user/auth/signout",
    AUTH_REISSUE: "/api/v1/user/auth/reissue",

    USER_SIGNUP: "/api/v1/user",
    USER_ID_CHECK: "/api/v1/user/username",
    USER_GETMYINFO: "/api/v1/user",
    USER_UPDATEMYINFO: "/api/v1/user",
    USER_DELETEUSER: "/api/v1/user/delete"
} as const