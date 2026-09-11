import { RouterLocaleSet } from "@/config/route/router";
import useSigninViewModel from "@/viewmodel/auth/useSigninViewModel";
import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export default function SigninPage() {

  const { t } = useTranslation()

  const {
    username,
    setUsername,
    password,
    setPassword,
    signinHandler
  } = useSigninViewModel()

  function formSubmitHandler(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    signinHandler()
  }

  function usernameInputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  function passwordInputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  return (
    <>
      <h1>SignIn Page</h1>
      <form
        onSubmit={formSubmitHandler}
      >
        <p>{t("page.signin_page.username")}</p>
        <input
          id="username"
          type="text"
          value={username}
          onChange={usernameInputChangeHandler}
        />
        <p>{t("page.signin_page.password")}</p>
        <input
          id="password"
          type="password"
          value={password}
          autoComplete="off"
          onChange={passwordInputChangeHandler}
        />
        <br />
        <button
          type="submit"
        >
          {t("page.signin_page.signin_button")}
        </button>
      </form>
    </>
  )
}
