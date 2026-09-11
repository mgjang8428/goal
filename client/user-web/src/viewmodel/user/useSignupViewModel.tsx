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
    const [passwordCheck, setPasswordCheck] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [isUsernameDuplicateCheck, setIsUsernameDuplicateCheck] = useState(false)
    const [isUsernameInputBlock, setIsUsernameInputBlock] = useState(false)

    async function signupHandler() {
        // ID 중복 확인 안했을 경우
        if (!isUsernameDuplicateCheck) {
            alert(t("signup_viewmodel.signup_need_duplecheck_alert"))
            return
        }
        // PW 일치 확인
        if (password != passwordCheck) {
            alert(t("signup_viewmodel.signup_password_notmatch_alert"))
            return
        }
        await userService.signup(username, password, name, email)
            .then(() => {
                alert(t("signup_viewmodel.signup_success_alert"))
                navigate(RouterLocaleSet.MAIN_PAGE, { replace: true })
            })
            .catch((error) => {
                log.error("signupHandler error: ", error)
                alert(t("signup_viewmodel.signup_error_alert"))
            })
    }

    async function duplicateUsernameCheck() {
        await userService.checkUsername(username)
            .then(() => {
                setIsUsernameDuplicateCheck(true)
                setIsUsernameInputBlock(true)
                alert(t("signup_viewmodel.duplecheck_ok_alert"))
            })
            .catch((error) => {
                log.error("duplicateUsernameCheck error: ", error)
                alert(t("signup_viewmodel.duplecheck_failed_alert"))
            })
    }

    function cancelDuplicateCheck() {
        setIsUsernameDuplicateCheck(false)
        setIsUsernameInputBlock(false)
    }

    return {
        username, setUsername,
        password, setPassword,
        passwordCheck, setPasswordCheck,
        name, setName,
        email, setEmail,
        signupHandler,
        isUsernameInputBlock,
        duplicateUsernameCheck,
        cancelDuplicateCheck
    }
}