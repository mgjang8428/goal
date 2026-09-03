import { RouterLocaleSet } from "@/config/route/router"
import useAuthStore from "@/store/authStore"
import useSignoutViewModel from "@/viewmodel/auth/useSignoutViewModel"
import { NavLink } from "react-router"

export default function Header() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const { signoutHandler } = useSignoutViewModel()
  return (
    <>
      {
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
        accessToken == null ? (
            <>
              <NavLink to={RouterLocaleSet.SIGNUP_PAGE}>
                <p>signup</p>
              </NavLink>
              <NavLink to={RouterLocaleSet.SIGNIN_PAGE}>
                <p>signin</p>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={RouterLocaleSet.MYINFO_PAGE}>
                <p>내정보</p>
                <br />
              </NavLink>
              <button onClick={signoutHandler}>로그아웃</button>
            </>
          )
      }
    </>
  )
}
