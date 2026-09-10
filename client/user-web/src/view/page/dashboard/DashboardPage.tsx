import { RouterLocaleSet } from "@/config/route/router";
import { NavLink } from "react-router";

export default function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>
      <NavLink to={RouterLocaleSet.GOAL_PAGE}>
        <p>Go Goal!</p>
      </NavLink>
    </>
  )
}
