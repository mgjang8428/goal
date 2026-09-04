import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type AuthService from "@/model/auth/service/authService"
import type { Logger } from "@/util/logger/logger"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

export default function useSigninViewModel() {
    const log: Logger = container.resolve(ContainerSet.LOGGER)
    const authService: AuthService = container.resolve(ContainerSet.AUTH_SERVICE)

    const { t } = useTranslation('noti')

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function signinHandler(event: React.SubmitEvent<HTMLFormElement>) {
        log.debug("Do signinHandler()")
        event.preventDefault()
        try {
            await authService.signin(username, password)
        } catch (error) {
            alert(t("signin_viewmodel.signin_failed_alert"))
            return
        }
        navigate(RouterLocaleSet.DASHBOARD_PAGE, { replace: true })
    }
    return {
        username,
        setUsername,
        password,
        setPassword,
        signinHandler
    }
}
