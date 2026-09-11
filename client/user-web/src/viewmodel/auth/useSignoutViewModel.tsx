import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type AuthService from "@/model/auth/service/authService"
import type { Logger } from "@/util/logger/logger"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

export default function useSignoutViewModel() {

    const log: Logger = container.resolve(ContainerSet.LOGGER)
    const authService: AuthService = container.resolve(ContainerSet.AUTH_SERVICE)

    const navigate = useNavigate()
    const { t } = useTranslation('noti')

    async function signoutHandler() {
        if (!confirm(t("signout_viewmodel.signout_confirm"))) return

        await authService.signout()
            .then(() => {
                navigate(RouterLocaleSet.MAIN_PAGE)
            })
            .catch((error) => {
                log.error("signoutHandler error: ", error)
                alert("로그아웃 에러")
            })
    }
    return {
        signoutHandler
    }
}