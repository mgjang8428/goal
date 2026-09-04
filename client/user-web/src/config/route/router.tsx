import checkAccessToken from "@/config/network/checkAccessToken"
import DefaultLayout from "@/view/layouts/DefaultLayout"
import DashboardPage from "@/view/page/dashboard/DashboardPage"
import MainPage from "@/view/page/MainPage"
import MyInfoPage from "@/view/page/myinfo/MyInfoPage"
import SigninPage from "@/view/page/signin/SigninPage"
import SignupPage from "@/view/page/signup/SignupPage"
import { createBrowserRouter } from "react-router"

export const RouterLocaleSet = {
  MAIN_PAGE: "/",
  SIGNUP_PAGE: "/signup",
  SIGNIN_PAGE: "/signin",
  DASHBOARD_PAGE: "/dashboard",
  MYINFO_PAGE: "/myinfo"
} as const

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "/signup",
        element: <SignupPage />
      },
      {
        path: "/signin",
        element: <SigninPage />
      },
      // {
      //   path: "/dashboard",
      //   loader: checkAccessToken,
      //   element: <DashboardPage />
      // },
      // {
      //   path: "/myinfo",
      //   loader: checkAccessToken,
      //   element: <MyInfoPage />
      // }
    ]
  },
  {
    path: "/",
    element: <DefaultLayout />,
    loader: checkAccessToken,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />
      },
      {
        path: "/myinfo",
        element: <MyInfoPage />
      }
    ]
  }
])

export default router