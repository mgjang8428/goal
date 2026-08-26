import checkAccessToken from "@/config/network/checkAccessToken"
import DashboardPage from "@/view/page/dashboard/DashboardPage"
import MainPage from "@/view/page/MainPage"
import SigninPage from "@/view/page/signin/SigninPage"
import SignupPage from "@/view/page/signup/SignupPage"
import { createBrowserRouter } from "react-router"

export const RouterLocaleSet = {
  MAIN_PAGE: "/",
  SIGNUP_PAGE: "/signup",
  SIGNIN_PAGE: "/signin",
  DASHBOARD_PAGE: "/dashboard"
} as const

const router = createBrowserRouter([
  {
    path: RouterLocaleSet.MAIN_PAGE,
    element: <MainPage />
  },
  {
    path: RouterLocaleSet.SIGNUP_PAGE,
    element: <SignupPage />
  },
  {
    path: RouterLocaleSet.SIGNIN_PAGE,
    element: <SigninPage />
  },
  {
    path: RouterLocaleSet.DASHBOARD_PAGE,
    middleware: [checkAccessToken],
    element: <DashboardPage />
  }
])

export default router