import { RouterLocaleSet } from "@/config/route/router";
import useSigninViewModel from "@/viewmodel/auth/useSigninViewModel";
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
  return (
    <>
      <h1>SignIn Page</h1>
      <NavLink to={RouterLocaleSet.MAIN_PAGE} end>
        <p>Go Main</p>
      </NavLink>
      <form onSubmit={(event: React.SubmitEvent<HTMLFormElement>) => { signinHandler(event) }}>
        <label>{t("page.signin_page.username")}</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
        />
        <br/>
        <label>{t("page.signin_page.password")}</label>
        <input
          id="password"
          type="password"
          value={password}
          autoComplete="off"
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <br/>
        <button type="submit">{t("page.signin_page.signin_button")}</button>
      </form>
    </>
  )
}
