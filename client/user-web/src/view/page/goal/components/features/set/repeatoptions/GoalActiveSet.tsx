import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useTranslation } from "react-i18next"

export default function GoalActiveSet() {

	const { t } = useTranslation()
	const { isActive, setIsActive } = useGoalInfoStore()

	return (
		<label>
			{t("goal_components:set.repeatoptions.goalactiveset.label.isActtive")}
			<input
				type="checkbox"
				checked={isActive}
				onChange={() => {
					setIsActive(!isActive)
				}}
			/>
		</label>
	)
}
