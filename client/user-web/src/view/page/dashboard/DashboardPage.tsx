import { RouterLocaleSet } from "@/config/route/router"
import CNavLink from "@/view/layouts/components/CNavLink"
import { useTranslation } from "react-i18next"

export default function DashboardPage() {
	const { t } = useTranslation()
	return (
		<>
			<h1>{t("dashboard_page:title")}</h1>
			<div className="w-fit h-fit">
				<CNavLink to={RouterLocaleSet.GOAL_PAGE}>
					<h3>{t("dashboard_page:menu.goal")}</h3>
				</CNavLink>
			</div>
		</>
	)
}
