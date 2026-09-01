import { RouterLocaleSet } from "@/config/route/router";
import useSignoutViewModel from "@/viewmodel/auth/useSignoutViewModel";
import { NavLink } from "react-router";

export default function DashboardPage() {
  const { signoutHandler } = useSignoutViewModel()

  return (
    <>
      <h1>Dashboard</h1>
      <NavLink to={RouterLocaleSet.MYINFO_PAGE}>
        <p>내정보</p>
        <br/>
      </NavLink>
      <button onClick={signoutHandler}>로그아웃</button>
    </>
  )
}
