import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useTranslation } from "react-i18next"

export default function GoalTitleContentSet() {
	const { t } = useTranslation()

	const { title, setTitle, content, setContent } = useGoalInfoStore()

	return (
		<>
			<p>{t("goal_components:set.goaltitlecontentinfo.label.content")}</p>
			<input
				type="text"
				placeholder={t(
					"goal_components:set.goaltitlecontentinfo.input_placholder.title"
				)}
				value={title}
				onChange={(event) => {
					setTitle(event.target.value)
				}}
				minLength={1}
				maxLength={100}
				required
			/>
			<p>{t("goal_components:set.goaltitlecontentinfo.label.title")}</p>
			<textarea
				placeholder={t(
					"goal_components:set.goaltitlecontentinfo.input_placholder.content"
				)}
				value={content}
				onChange={(event) => {
					setContent(event.target.value)
				}}
				maxLength={3000}
			/>
		</>
	)
}
