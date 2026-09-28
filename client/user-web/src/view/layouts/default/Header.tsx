import { RouterLocaleSet } from "@/config/route/router"
import useAuthStore from "@/store/authStore"
import CNavLink from "@/view/layouts/components/CNavLink"
import useSignoutViewModel from "@/viewmodel/auth/useSignoutViewModel"
import { useTranslation } from "react-i18next"

export default function Header() {
	const accessToken = useAuthStore((state) => state.accessToken)
	const { signoutHandler } = useSignoutViewModel()
	const { t } = useTranslation()
	return (
		<header className="flex items-center fixed w-full h-17 bg-gray-500 text-white">
			{
				// 로그인 여부에 따른 로고 이동 경로 변경
				accessToken == null ? (
					<CNavLink to={RouterLocaleSet.MAIN_PAGE}>
						<h1 className="ml-3">{t("layouts:header.logo")}</h1>
					</CNavLink>
				) : (
					<CNavLink to={RouterLocaleSet.DASHBOARD_PAGE}>
						<h1 className="ml-3">{t("layouts:header.logo")}</h1>
					</CNavLink>
				)
			}
			<div className="m-auto"></div>
			{
				// 로그인 여부에 따른 헤더 구성 변경
				accessToken == null ? (
					<>
						<CNavLink to={RouterLocaleSet.SIGNUP_PAGE}>
							<p className="mr-3">{t("layouts:header.signup")}</p>
						</CNavLink>
						<CNavLink to={RouterLocaleSet.SIGNIN_PAGE}>
							<p className="mr-3">{t("layouts:header.signin")}</p>
						</CNavLink>
					</>
				) : (
					<>
						<CNavLink to={RouterLocaleSet.MYINFO_PAGE}>
							<p className="mr-3">{t("layouts:header.myinfo")}</p>
						</CNavLink>
						<button onClick={signoutHandler} className="mr-3">
							{t("layouts:header.signout")}
						</button>
					</>
				)
			}
		</header>
	)
}
