import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useTranslation } from "react-i18next"

export default function GoalTitleContentInfo() {
	const {t} = useTranslation()
	const { title, content } = useGoalInfoStore()
	return (
		<>
			<p>{t("goal_components:info.goaltitlecontentinfo.label.title")}</p>
			<p>{title}</p>
			<p>{t("goal_components:info.goaltitlecontentinfo.label.content")}</p>
			<p>{content}</p>
		</>
	)
}
