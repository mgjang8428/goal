import { apiLocale } from "@/config/network/apiLocale"
import { RouterLocaleSet } from "@/config/route/router"
import type ReissueResponseDto from "@/model/auth/dto/response/reissueResponseDto"
import type ResponseDto from "@/model/global/dto/responseDto"
import useAuthStore from "@/store/authStore"
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"
import i18next from "i18next"

const baseURL: string = import.meta.env.VITE_NETWORK_API_URL
const timeout: number = import.meta.env.VITE_NETWORK_API_TIMEOUT as number

/**
 * public api
 * 
 * 인증 필요 없는 api
 */
export const api = axios.create({
    baseURL: baseURL,
    timeout: timeout,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

/** 
 * private api
 * 
 * 인증 필요
 */
export const authApi = axios.create({
    baseURL: baseURL,
    timeout: timeout,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

/**
 * refresh api: refresh token 발급 용
 */
export const refreshApi = axios.create({
    baseURL: baseURL,
    timeout: timeout,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

/**
 * 동시 요청 관리
 * 
 * default: false
 */
let isRefreshing = false;
/**
 * 실패 큐 배열
 */
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
}> = [];
/**
 * 실패 큐 재실행
 * @param error any
 * @param token string | null default: null
 */
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

/**
 * private api interceptors
 * 
 * api 요청 시 마다 accessToken을 api 서버로 전송
 */
authApi.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { accessToken } = useAuthStore.getState()
        if (accessToken != null) {
            config.headers.set('Authorization', `Bearer ${accessToken}`)
        }
        return config
    },
    (error) => Promise.reject(error)
)

// TODO: 정리 필요
authApi.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
        if ((error.response?.status == 401 || error.response?.status == 403) && originalRequest && !originalRequest._retry) {
            // 동시 요청 방지
            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => { failedQueue.push({ resolve, reject }) })
                    .then((accessToken) => {
                        originalRequest.headers.set('Authorization', `Bearer ${accessToken}`)
                        return authApi(originalRequest);
                    })
                    .catch((error) => Promise.reject(error))
            }
            originalRequest._retry = true
            isRefreshing = true

            // refreshToken 재발급
            try {
                const { setAccessToken } = useAuthStore.getState()

                const response = await refreshApi.post<ResponseDto<ReissueResponseDto>>(apiLocale.AUTH_REISSUE)
                const newAccessToken = response.data.dto?.accessToken as string


                // 새로운 AccessToken AuthStorage에 저장
                setAccessToken(newAccessToken)
                // 새 AccessToken 헤더에 지정
                originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`)

                // 큐에 저장된 요청 처리
                processQueue(null, newAccessToken)

                return authApi(originalRequest)

            } catch (refreshError) {
                const { popAccessToken } = useAuthStore.getState()
                // 큐에 저장된 요청 Errror 처리
                processQueue(refreshError, null)
                // 기존 AccessToken 제거, AuthStorage
                popAccessToken()

                // 재로그인 요청 alert
                alert(i18next.t("noti:auth_error.need_to_resignin"))
                // 로그인 페이지로 강제 이동
                window.location.href = RouterLocaleSet.SIGNIN_PAGE

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error)
    }
)