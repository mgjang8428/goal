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

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    async function signupHandler(event: React.SubmitEvent<HTMLFormElement>) {
        log.debug("Do signupHandler()")
        event.preventDefault()
        try {
            await userService.signup(username, password, name, email)
        } catch (error) {
            alert("가입 실패")
            return
        }
        navigate(RouterLocaleSet.MAIN_PAGE, { replace: true })
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
        signupHandler
    }

}