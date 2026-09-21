import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useTranslation } from "react-i18next"

export default function WeeklyRepeatInfo() {
	const { t } = useTranslation()
	const { weekRepeatInfo } = useGoalInfoStore()
	return (
		<>
			<label>
				{t("goal_components:info.repeatoptions.repeatype.weeklyRepeat.mon")}
				<input
					type="checkbox"
					checked={weekRepeatInfo.MON}
					readOnly={true}
				/>
			</label>
			<label>
				{t("goal_components:info.repeatoptions.repeatype.weeklyRepeat.tue")}
				<input
					type="checkbox"
					checked={weekRepeatInfo.TUE}
					readOnly={true}
				/>
			</label>
			<label>
				{t("goal_components:info.repeatoptions.repeatype.weeklyRepeat.wed")}
				<input
					type="checkbox"
					checked={weekRepeatInfo.WED}
					readOnly={true}
				/>
			</label>
			<label>
				{t("goal_components:info.repeatoptions.repeatype.weeklyRepeat.thu")}
				<input
					type="checkbox"
					checked={weekRepeatInfo.THU}
					readOnly={true}
				/>
			</label>
			<label>
				{t("goal_components:info.repeatoptions.repeatype.weeklyRepeat.fri")}
				<input
					type="checkbox"
					checked={weekRepeatInfo.FRI}
					readOnly={true}
				/>
			</label>
			<label>
				{t("goal_components:info.repeatoptions.repeatype.weeklyRepeat.sat")}
				<input
					type="checkbox"
					checked={weekRepeatInfo.SAT}
					readOnly={true}
				/>
			</label>
			<label>
				{t("goal_components:info.repeatoptions.repeatype.weeklyRepeat.sun")}
				<input
					type="checkbox"
					checked={weekRepeatInfo.SUN}
					readOnly={true}
				/>
			</label>
		</>
	)
}
