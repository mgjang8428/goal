import { RouterLocaleSet } from '@/config/route/router'
import useSignupViewModel from '@/viewmodel/user/useSignupViewModel'
import type React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'

export default function SignupPage() {
    const { t } = useTranslation()

    const {
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
    } = useSignupViewModel()

    return (
        <>
            <h1>SignupPage</h1>
            <NavLink to={RouterLocaleSet.MAIN_PAGE} end>
                <p>Go Main</p>
            </NavLink>
            <form onSubmit={(event: React.SubmitEvent<HTMLFormElement>) => { signupHandler(event) }}>
                <label>{t("page.signup_page.username")} : </label>
                {
                    isUsernameInputBlock ? (
                        <>
                            <span>{username}</span>
                            <button
                                type='button'
                                onClick={() => { cancelDuplicateCheck() }}
                            >
                                {t("page.signup_page.check_username_button.recheck_button")}
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                id='username'
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <button
                                type='button'
                                onClick={() => { duplicateUsernameCheck() }}
                            >
                                {t("page.signup_page.check_username_button.check_button")}
                            </button>
                        </>
                    )
                }
                <br/>
                <label>{t("page.signup_page.password")} : </label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <label>{t("page.signup_page.name")} : </label>
                <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br/>
                <label>{t("page.signup_page.email")} : </label>
                <input
                    id='email'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <button type='submit'>{t("page.signup_page.signup_button")}</button>
            </form >
        </>
    )
}
