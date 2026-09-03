import container, { ContainerSet } from "@/config/di/container";
import { RouterLocaleSet } from "@/config/route/router";
import type { UserService } from "@/model/user/service/userService";
import type { Logger } from "@/util/logger/logger";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function useSignupViewModel() {
    const log: Logger = container.resolve(ContainerSet.LOGGER)
    const userService: UserService = container.resolve(ContainerSet.USER_SERVICE)

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
            alert("ID 중복확인이 필요합니다.")
            return
        }
        try {
            await userService.signup(username, password, name, email)
        } catch (error) {
            alert("가입 실패")
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
            alert("사용 가능한 아이디입니다.")
        } catch (error) {
            alert("중복 아이디입니다.")
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