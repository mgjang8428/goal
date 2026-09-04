import container, { ContainerSet } from "@/config/di/container";
import { RouterLocaleSet } from "@/config/route/router";
import type { UserService } from "@/model/user/service/userService";
import type { Logger } from "@/util/logger/logger";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function useSignupViewModel() {
    const log: Logger = container.resolve(ContainerSet.LOGGER)
    const userService: UserService = container.resolve(ContainerSet.USER_SERVICE)

    const { t } = useTranslation('noti')

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [isUsernameDuplicateCheck, setIsUsernameDuplicateCheck] = useState(false)
    const [isUsernameInputBlock, setIsUsernameInputBlock] = useState(false)

    async function signupHandler(event: React.SubmitEvent<HTMLFormElement>) {
        log.debug("Do signupHandler()")
        event.preventDefault()
        if (!isUsernameDuplicateCheck) {
            alert(t("signup_viewmodel.signup_need_duplecheck_alert"))
            return
        }
        try {
            await userService.signup(username, password, name, email)
        } catch (error) {
            alert(t("signup_viewmodel.signup_error_alert"))
            return
        }
        navigate(RouterLocaleSet.MAIN_PAGE, { replace: true })
    }

    async function duplicateUsernameCheck() {
        log.debug("Do duplicateUsernameCheck()")
        try {
            await userService.checkUsername(username)
            setIsUsernameDuplicateCheck(true)
            setIsUsernameInputBlock(true)
            alert(t("signup_viewmodel.duplecheck_ok_alert"))
        } catch (error) {
            alert(t("signup_viewmodel.duplecheck_failed_alert"))
        }
    }

    function cancelDuplicateCheck() {
        setIsUsernameDuplicateCheck(false)
        setIsUsernameInputBlock(false)
    }

    return {
        username,
        password,
        name,
        email,
        setUsername,
        setPassword,
        setName,
        setEmail,
        signupHandler,
        isUsernameInputBlock,
        duplicateUsernameCheck,
        cancelDuplicateCheck
    }

}