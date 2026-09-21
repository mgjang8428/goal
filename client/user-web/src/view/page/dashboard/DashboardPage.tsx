import { RouterLocaleSet } from "@/config/route/router"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router"

export default function DashboardPage() {
	const { t } = useTranslation()
	return (
		<>
			<h1>{t("dashboard_page:title")}</h1>
			<NavLink to={RouterLocaleSet.GOAL_PAGE}>
				<h3>{t("dashboard_page:menu.goal")}</h3>
			</NavLink>
		</>
	)
}
