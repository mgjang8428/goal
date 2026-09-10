/**
 * api 주소 상수 모음
 */
const API_V1 = `/api/v1`
const USER_API = `${API_V1}/user`
const AUTH_API = `${API_V1}/user/auth`
const GOAL_API = `${API_V1}/goal`

export const apiLocale = {
    // AUTH API LOCALE
    /** POST */
    AUTH_SIGNIN: `${AUTH_API}/signin`,
    /** POST */
    AUTH_SIGNOUT: `${AUTH_API}/signout`,
    /** POST */
    AUTH_REISSUE: `${AUTH_API}/reissue`,

    // USER API LOCALE
    /** POST */
    USER_SIGNUP: `${USER_API}`,
    /** GET */
    USER_ID_CHECK: `${USER_API}/username`,
    /** GET */
    USER_GETMYINFO: `${USER_API}`,
    /** PATCH */
    USER_UPDATEMYINFO: `${USER_API}`,
    /** DELETE */
    USER_DELETEUSER: `${USER_API}/delete`,

    // GOAL API LOCALE
    /** POST */
    GOAL_CREATE: `${GOAL_API}`,
    /** GET */
    GOAL_GETLIST: `${GOAL_API}`,
    /** GET */
    GOAL_GETDETAIL: (goalId: number) => `/api/v1/goal/${goalId}`,
    /** PATCH */
    GOAL_UPDATE: (goalId: number) => `/api/v1/goal/${goalId}`,
    /** DELETE */
    GOAL_DELETE: (goalId: number) => `/api/v1/goal/${goalId}`
} as const