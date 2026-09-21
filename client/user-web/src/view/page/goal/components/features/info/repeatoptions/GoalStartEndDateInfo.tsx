import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useTranslation } from "react-i18next"

export default function GoalStartEndDateInfo() {
	const { t } = useTranslation()
	const { startDate, isEndDate, endDate } = useGoalInfoStore()
	return (
		<>
			<p>
				{t(
					"goal_components:info.repeatoptions.goalstartenddateinfo.label.startdate"
				)}
				<span>{startDate}</span>
			</p>
			<p>
				{t(
					"goal_components:info.repeatoptions.goalstartenddateinfo.label.enddate"
				)}
				<span>
					{isEndDate
						? endDate
						: t(
								"goal_components:info.repeatoptions.goalstartenddateinfo.null_enddate"
							)}
				</span>
			</p>
		</>
	)
}
