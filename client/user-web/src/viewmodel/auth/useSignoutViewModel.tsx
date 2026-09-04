import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type AuthService from "@/model/auth/service/authService"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

export default function useSignoutViewModel() {
    const authService: AuthService = container.resolve(ContainerSet.AUTH_SERVICE)
    const navigate = useNavigate()
    const { t } = useTranslation('noti')
    async function signoutHandler() {
        const confirmResult: boolean = confirm(t("signout_viewmodel.signout_confirm"))
        if (confirmResult) {
            await authService.signout()
            navigate(RouterLocaleSet.MAIN_PAGE)
        }
    }
    return {
        signoutHandler
    }
}