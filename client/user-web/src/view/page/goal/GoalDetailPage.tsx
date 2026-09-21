import useGoalInfoStore from "@/store/goal/goalInfoStore"
import GoalRepeatOptionsInfo from "@/view/page/goal/components/features/info/GoalRepeatOptionsInfo"
import GoalTitleContentInfo from "@/view/page/goal/components/features/info/GoalTitleContentInfo"
import useGetGoalInfoViewModel from "@/viewmodel/goal/useGetGoalInfoViewModel"
import useGoalDetailViewModel from "@/viewmodel/goal/useGoalDetailViewModel"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router"

export default function GoalDetailPage() {
	const { t } = useTranslation()

	const { goalId } = useParams()

	const { setGoalId, initAllStoreData } = useGoalInfoStore()

	const { goUpdateGoalPage } = useGoalDetailViewModel()
	const { getGoalInfo } = useGetGoalInfoViewModel()

	useEffect(() => {
		setGoalId(Number(goalId))
		getGoalInfo(Number(goalId))
		return () => {
			initAllStoreData()
		}
	}, [goalId, setGoalId, getGoalInfo, initAllStoreData])

	return (
		<>
			<h1>GoalDetailPage</h1>
			<button onClick={goUpdateGoalPage}>
				{t("goal_page:detail.button.move_update_page")}
			</button>
			<p>
				{t("goal_page:detail.label.goalid")}<span>{goalId}</span>
			</p>
			<GoalTitleContentInfo />
			<GoalRepeatOptionsInfo />
		</>
	)
}
