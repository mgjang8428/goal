import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type AuthService from "@/model/auth/service/authService"
import { useNavigate } from "react-router"

export default function useSignoutViewModel() {
    const authService: AuthService = container.resolve(ContainerSet.AUTH_SERVICE)
    const navigate = useNavigate()
    function signoutHandler() {
        const confirmResult: boolean = confirm("로그아웃?")
        if (confirmResult) {
            authService.signout()
            navigate(RouterLocaleSet.MAIN_PAGE)
        }
    }
    return {
        signoutHandler
    }
}