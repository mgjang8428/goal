import checkAccessToken from "@/config/network/checkAccessToken"
import DefaultLayout from "@/view/layouts/DefaultLayout"
import DashboardPage from "@/view/page/dashboard/DashboardPage"
import GoalCreatePage from "@/view/page/goal/create/GoalCreatePage"
import GoalDetailPage from "@/view/page/goal/detail/GoalDetailPage"
import GoalPage from "@/view/page/goal/main/GoalPage"
import GoalUpdatePage from "@/view/page/goal/update/GoalUpdatePage"
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
  MYINFO_PAGE: "/myinfo",
  GOAL_PAGE: "/goal",
  GOAL_DETAIL_PAGE: (goalId: number) => `/goal/${goalId}`,
  GOAL_CREATE_PAGE: "/goal/create",
  GOAL_UPDATE_PAGE: (goalId: number) => `/goal/${goalId}/update`
} as const

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        Component: MainPage
      },
      {
        path: "/signup",
        Component: SignupPage
      },
      {
        path: "/signin",
        Component: SigninPage
      }
    ]
  },
  {
    path: "/",
    element: <DefaultLayout />,
    loader: checkAccessToken,
    children: [
      {
        path: "dashboard",
        Component: DashboardPage
      },
      {
        path: "myinfo",
        Component: MyInfoPage
      },
      {
        path: "goal",
        children: [
          {
            index: true,
            Component: GoalPage,
          },
          {
            path: "create",
            Component: GoalCreatePage
          },
          {
            path: ":goalId",
            children: [
              {
                index: true,
                Component: GoalDetailPage
              },
              {
                path: "update",
                Component: GoalUpdatePage
              }
            ]
          }
        ]
      }
    ]
  }
])

export default router