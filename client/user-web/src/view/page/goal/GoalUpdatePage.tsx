import useGoalInfoStore from "@/store/goal/goalInfoStore"
import GoalRepeatOptionsSet from "@/view/page/goal/components/features/set/GoalRepeatOptionsSet"
import GoalTitleContentSet from "@/view/page/goal/components/features/set/GoalTitleContentSet"
import useGetGoalInfoViewModel from "@/viewmodel/goal/useGetGoalInfoViewModel"
import useGoalUpdateViewModel from "@/viewmodel/goal/useGoalUpdateViewModel"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router"

export default function GoalUpdatePage() {
	const { t } = useTranslation()

	const { goalId } = useParams()

	const { setGoalId, initAllStoreData } = useGoalInfoStore()

	const { updateGoal } = useGoalUpdateViewModel()

	const { getGoalInfo } = useGetGoalInfoViewModel()

	useEffect(() => {
		setGoalId(Number(goalId))
		getGoalInfo(Number(goalId))
		return () => {
			initAllStoreData()
		}
	}, [goalId, setGoalId, getGoalInfo, initAllStoreData])

	function submitHandler(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
		updateGoal()
	}

	return (
		<>
			<p>
				{t("goal_page:update.label.goalid")}
				<span>{goalId}</span>
			</p>
			<form onSubmit={submitHandler}>
				<GoalTitleContentSet />
				<br />
				<GoalRepeatOptionsSet />
				<br />
				<button type="submit">
					{t("goal_page:update.button.update_submit")}
				</button>
			</form>
		</>
	)
}
