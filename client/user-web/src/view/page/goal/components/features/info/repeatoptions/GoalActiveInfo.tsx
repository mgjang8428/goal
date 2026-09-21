import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useTranslation } from "react-i18next"

export default function GoalActiveInfo() {
	const { t } = useTranslation()
	const { isActive } = useGoalInfoStore()
	return (
		<>
			<p>
				{t(
					"goal_components:info.repeatoptions.goalactiveinfo.label.isActtive"
				)}
				<span>
					<input type="checkbox" checked={isActive} readOnly={true} />
				</span>
			</p>
		</>
	)
}
