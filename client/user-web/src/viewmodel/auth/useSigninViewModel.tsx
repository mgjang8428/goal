import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type AuthService from "@/model/auth/service/authService"
import type { Logger } from "@/util/logger/logger"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

export default function useSigninViewModel() {
    const log: Logger = container.resolve(ContainerSet.LOGGER)
    const authService: AuthService = container.resolve(ContainerSet.AUTH_SERVICE)

    const { t } = useTranslation('noti')
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function signinHandler() {
        await authService.signin(username, password)
            .then(() => {
                navigate(RouterLocaleSet.DASHBOARD_PAGE, { replace: true })
            })
            .catch((error) => {
                log.error("signinHandler error: ", error)
                alert(t("signin_viewmodel.signin_failed_alert"))
            })
    }
    return {
        username,
        setUsername,
        password,
        setPassword,
        signinHandler
    }
}
