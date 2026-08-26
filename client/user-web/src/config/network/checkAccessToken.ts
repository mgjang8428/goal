import container, { ContainerSet } from "@/config/di/container";
import { RouterLocaleSet } from "@/config/route/router";
import type AuthService from "@/model/auth/service/authService";
import useAuthStore from "@/store/authStore";
import type { Logger } from "@/util/logger/logger";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router";

/**
 * AccessToken 확인
 * 
 * Store에 있는 AccessToken의 expiration을 확인 만료 시 로그인 페이지로 이동
 */
export default async function checkAccessToken() {
    const { accessToken } = useAuthStore.getState()

    const log: Logger = container.resolve(ContainerSet.LOGGER)
    const authService: AuthService = container.resolve(ContainerSet.AUTH_SERVICE)

    // null 체크
    if (accessToken == null) {
        alert("재로그인이 필요합니다.")
        authService.signout()
        return redirect(RouterLocaleSet.SIGNIN_PAGE)
    }

    // AccessToken decode
    const decodedAccessToken = jwtDecode(accessToken as string)

    // accessToken 만료시간, 현재시간 비교
    const accessTokenExpiration = decodedAccessToken.exp as number * 1000
    const nowTime = Date.now()
    if (accessTokenExpiration < nowTime) {
        try {
            authService.reissue()
            return
        } catch (error) {
            log.error(error)
            alert("재로그인이 필요합니다.")
            authService.signout()
            return redirect(RouterLocaleSet.SIGNIN_PAGE)
        }
    }
}