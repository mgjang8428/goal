import { RouterLocaleSet } from "@/config/route/router"
import useAuthStore from "@/store/authStore"
import useSignoutViewModel from "@/viewmodel/auth/useSignoutViewModel"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router"

export default function Header() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const { signoutHandler } = useSignoutViewModel()
  const { t } = useTranslation()
  return (
    <header className="bg-gray-500 text-white">
      {
        // 로그인 여부에 따른 로고 이동 경로 변경
        accessToken == null ? (
          <>
            <NavLink to={RouterLocaleSet.MAIN_PAGE}>
              <h1>Goal Project</h1>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to={RouterLocaleSet.DASHBOARD_PAGE}>
              <h1>Goal Project</h1>
            </NavLink>
          </>
        )
      }
      {
        // 로그인 여부에 따른 헤더 구성 변경
        accessToken == null ? (
            <>
              <NavLink to={RouterLocaleSet.SIGNUP_PAGE}>
                <p>{t("layouts.header.signup")}</p>
              </NavLink>
              <NavLink to={RouterLocaleSet.SIGNIN_PAGE}>
                <p>{t("layouts.header.signin")}</p>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={RouterLocaleSet.MYINFO_PAGE}>
                <p>{t("layouts.header.myinfo")}</p>
                <br />
              </NavLink>
              <button onClick={signoutHandler}>{t("layouts.header.signout")}</button>
            </>
          )
      }
    </header>
  )
}
