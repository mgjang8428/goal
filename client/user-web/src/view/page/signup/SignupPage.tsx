import { RouterLocaleSet } from '@/config/route/router'
import useSignupViewModel from '@/viewmodel/user/useSignupViewModel'
import type { ChangeEvent } from 'react'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'

export default function SignupPage() {

    const { t } = useTranslation()

    const {
        username, setUsername,
        password, setPassword,
        passwordCheck, setPasswordCheck,
        name, setName,
        email, setEmail,
        signupHandler,
        isUsernameInputBlock,
        duplicateUsernameCheck,
        cancelDuplicateCheck
    } = useSignupViewModel()

    function submitHandler(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        signupHandler()
    }

    function duplicateCheckBtnHandler() {
        duplicateUsernameCheck()
    }

    function cancelDuplicateCheckBtnHandler() {
        cancelDuplicateCheck()
    }

    function usernameInputOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    function passwordInputOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function passwordCheckInputOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setPasswordCheck(event.target.value)
    }

    function nameInputOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    function emailInputOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    return (
        <>
            <h1>SignupPage</h1>
            <form
                onSubmit={submitHandler}
            >
                <p>{t("page.signup_page.username")}</p>
                {
                    isUsernameInputBlock ? (
                        <>
                            <span>{username}</span>
                            <button
                                type='button'
                                onClick={cancelDuplicateCheckBtnHandler}
                                children={t("page.signup_page.check_username_button.recheck_button")}
                            />
                        </>
                    ) : (
                        <>
                            <input
                                id='username'
                                type='text'
                                value={username}
                                onChange={usernameInputOnChangeHandler}
                            />
                            <button
                                type='button'
                                onClick={duplicateCheckBtnHandler}
                                children={t("page.signup_page.check_username_button.check_button")}
                            />
                        </>
                    )
                }
                <p>{t("page.signup_page.password")}</p>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={passwordInputOnChangeHandler}
                />
                <p>{t("page.signup_page.password_check")}</p>
                <input
                    id='passwordCheck'
                    type='password'
                    value={passwordCheck}
                    onChange={passwordCheckInputOnChangeHandler}
                />
                <p>{t("page.signup_page.name")}</p>
                <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={nameInputOnChangeHandler}
                />
                <p>{t("page.signup_page.email")}</p>
                <input
                    id='email'
                    type='text'
                    value={email}
                    onChange={emailInputOnChangeHandler}
                />
                <br />
                <button
                    type='submit'
                    children={t("page.signup_page.signup_button")}
                />
            </form >
        </>
    )
}
