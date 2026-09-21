import RepeatType from "@/model/goal/const/repeatType"
import useGoalInfoStore from "@/store/goal/goalInfoStore"
import MonthlyRepeatInfo from "@/view/page/goal/components/features/info/repeatoptions/repeatype/MonthlyRepeatInfo"
import SelectRepeatInfo from "@/view/page/goal/components/features/info/repeatoptions/repeatype/SelectRepeatInfo"
import WeeklyRepeatInfo from "@/view/page/goal/components/features/info/repeatoptions/repeatype/WeeklyRepeatInfo"
import YearlyRepeatInfo from "@/view/page/goal/components/features/info/repeatoptions/repeatype/YearlyRepeatInfo"
import { useTranslation } from "react-i18next"

export default function GoalRepeatInfo() {
	const { t } = useTranslation()

	const { isGoalRepeat, repeatType } = useGoalInfoStore()

	function repeatTypeName(): string {
		switch (repeatType) {
			case RepeatType.NONE:
				return t(
					"goal_components:info.repeatoptions.goalrepeatinfo.weektype_data.none"
				)
			case RepeatType.ALWAYS:
				return t(
					"goal_components:info.repeatoptions.goalrepeatinfo.weektype_data.always"
				)
			case RepeatType.WEEKLY:
				return t(
					"goal_components:info.repeatoptions.goalrepeatinfo.weektype_data.weekly"
				)
			case RepeatType.MONTHLY:
				return t(
					"goal_components:info.repeatoptions.goalrepeatinfo.weektype_data.monthly"
				)
			case RepeatType.YEARLY:
				return t(
					"goal_components:info.repeatoptions.goalrepeatinfo.weektype_data.yearly"
				)
			case RepeatType.SELECT:
				return t(
					"goal_components:info.repeatoptions.goalrepeatinfo.weektype_data.select"
				)
			default:
				return t(
					"goal_components:info.repeatoptions.goalrepeatinfo.weektype_data.default"
				)
		}
	}

	function repeatInfo(): React.ReactNode {
		switch (repeatType) {
			case RepeatType.NONE:
				return <></>
			case RepeatType.ALWAYS:
				return <></>
			case RepeatType.WEEKLY:
				return (
					<>
						<WeeklyRepeatInfo />
					</>
				)
			case RepeatType.MONTHLY:
				return (
					<>
						<MonthlyRepeatInfo />
					</>
				)
			case RepeatType.YEARLY:
				return (
					<>
						<YearlyRepeatInfo />
					</>
				)
			case RepeatType.SELECT:
				return (
					<>
						<SelectRepeatInfo />
					</>
				)
			default:
				return <></>
		}
	}

	return (
		<>
			<p>
				{t(
					"goal_components:info.repeatoptions.goalrepeatinfo.label.isRepeat"
				)}
				<span>
					<input
						type="checkbox"
						checked={isGoalRepeat}
						readOnly={true}
					/>
				</span>
			</p>
			<p>
				{t(
					"goal_components:info.repeatoptions.goalrepeatinfo.label.repeatType"
				)}
				<span>{repeatTypeName()}</span>
			</p>
			{
				// repeatType에 따른 반복 정보 라벨
				repeatType == RepeatType.NONE
				|| repeatType == RepeatType.ALWAYS ? (
					<></>
				) : (
					<p>{t("goal_components:info.repeatoptions.goalrepeatinfo.label.repeatInfo")}</p>
				)
			}
			<div>{repeatInfo()}</div>
		</>
	)
}
