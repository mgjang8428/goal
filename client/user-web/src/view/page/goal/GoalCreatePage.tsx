import GoalTitleContentSet from "@/view/page/goal/components/features/set/GoalTitleContentSet"
import useGoalCreateViewModel from "@/viewmodel/goal/useGoalCreateViewModel"
import { useTranslation } from "react-i18next"
import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useEffect } from "react"
import GoalRepeatOptionsSet from "@/view/page/goal/components/features/set/GoalRepeatOptionsSet"

export default function GoalCreatePage() {
	const { t } = useTranslation()

	const { initAllStoreData } = useGoalInfoStore()

	const { goalCreate } = useGoalCreateViewModel()

	function submitHandler(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
		goalCreate()
	}

	useEffect(() => {
		return () => {
			initAllStoreData()
		}
	}, [initAllStoreData])

	return (
		<>
			<h1>{t("goal_page:create.title")}</h1>
			<form onSubmit={submitHandler}>
				<GoalTitleContentSet />
				<br />
				<GoalRepeatOptionsSet />
				<br />
				<button type="submit">
					{t("goal_page:create.button.create_submit")}
				</button>
			</form>
		</>
	)
}
