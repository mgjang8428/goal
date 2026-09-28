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
		<header className="flex items-center h-17 bg-gray-500 text-white">
			{
				// 로그인 여부에 따른 로고 이동 경로 변경
				accessToken == null ? (
					<div className="w-fit h-fit">
						<NavLink to={RouterLocaleSet.MAIN_PAGE}>
							<h1 className="ml-3">{t("layouts:header.logo")}</h1>
						</NavLink>
					</div>
				) : (
					<div className="w-fit h-fit">
						<NavLink to={RouterLocaleSet.DASHBOARD_PAGE}>
							<h1 className="ml-3">{t("layouts:header.logo")}</h1>
						</NavLink>
					</div>
				)
			}
			<div className="m-auto"></div>
			{
				// 로그인 여부에 따른 헤더 구성 변경
				accessToken == null ? (
					<>
						<div className="w-fit h-fit">
							<NavLink to={RouterLocaleSet.SIGNUP_PAGE}>
								<p className="mr-3">
									{t("layouts:header.signup")}
								</p>
							</NavLink>
						</div>
						<div className="w-fit h-fit">
							<NavLink to={RouterLocaleSet.SIGNIN_PAGE}>
								<p className="mr-3">
									{t("layouts:header.signin")}
								</p>
							</NavLink>
						</div>
					</>
				) : (
					<>
						<div className="w-fit h-fit">
							<NavLink to={RouterLocaleSet.MYINFO_PAGE}>
								<p className="mr-3">
									{t("layouts:header.myinfo")}
								</p>
							</NavLink>
						</div>
						<button onClick={signoutHandler} className="mr-3">
							{t("layouts:header.signout")}
						</button>
					</>
				)
			}
		</header>
	)
}
