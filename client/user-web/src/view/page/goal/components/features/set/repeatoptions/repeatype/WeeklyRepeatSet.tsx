import useGoalInfoStore, {
	type WeekRepeatSetCheck
} from "@/store/goal/goalInfoStore"
import { useTranslation } from "react-i18next"

export default function WeeklyRepeatSet() {
	const { t } = useTranslation()

	const { weekRepeatInfo, setWeekRepeatInfoSetDayValue } = useGoalInfoStore()

	function onChangeHandler(day: keyof WeekRepeatSetCheck, value: boolean) {
		setWeekRepeatInfoSetDayValue(day, value)
		console.log(weekRepeatInfo)
	}

	return (
		<>
			<p>
				{t(
					"goal_components:set.repeatoptions.repeatype.weeklyRepeat.label"
				)}
			</p>
			<label>
				{t(
					"goal_components:set.repeatoptions.repeatype.weeklyRepeat.mon"
				)}
				<input
					type="checkbox"
					checked={weekRepeatInfo.MON}
					onChange={() => {
						onChangeHandler("MON", !weekRepeatInfo.MON)
					}}
				/>
			</label>
			<label>
				{t(
					"goal_components:set.repeatoptions.repeatype.weeklyRepeat.tue"
				)}
				<input
					type="checkbox"
					checked={weekRepeatInfo.TUE}
					onChange={() => {
						onChangeHandler("TUE", !weekRepeatInfo.TUE)
					}}
				/>
			</label>
			<label>
				{t(
					"goal_components:set.repeatoptions.repeatype.weeklyRepeat.wed"
				)}
				<input
					type="checkbox"
					checked={weekRepeatInfo.WED}
					onChange={() => {
						onChangeHandler("WED", !weekRepeatInfo.WED)
					}}
				/>
			</label>
			<label>
				{t(
					"goal_components:set.repeatoptions.repeatype.weeklyRepeat.thu"
				)}
				<input
					type="checkbox"
					checked={weekRepeatInfo.THU}
					onChange={() => {
						onChangeHandler("THU", !weekRepeatInfo.THU)
					}}
				/>
			</label>
			<label>
				{t(
					"goal_components:set.repeatoptions.repeatype.weeklyRepeat.fri"
				)}
				<input
					type="checkbox"
					checked={weekRepeatInfo.FRI}
					onChange={() => {
						onChangeHandler("FRI", !weekRepeatInfo.FRI)
					}}
				/>
			</label>
			<label>
				{t(
					"goal_components:set.repeatoptions.repeatype.weeklyRepeat.sat"
				)}
				<input
					type="checkbox"
					checked={weekRepeatInfo.SAT}
					onChange={() => {
						onChangeHandler("SAT", !weekRepeatInfo.SAT)
					}}
				/>
			</label>
			<label>
				{t(
					"goal_components:set.repeatoptions.repeatype.weeklyRepeat.sun"
				)}
				<input
					type="checkbox"
					checked={weekRepeatInfo.SUN}
					onChange={() => {
						onChangeHandler("SUN", !weekRepeatInfo.SUN)
					}}
				/>
			</label>
		</>
	)
}
