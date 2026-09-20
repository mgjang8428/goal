import RepeatType from "@/model/goal/const/repeatType"
import useGoalInfoStore from "@/store/goal/goalInfoStore"
import MonthlyRepeatSet from "@/view/page/goal/components/features/repeatoptions/repeatype/MonthlyRepeatSet"
import SelectRepeatSet from "@/view/page/goal/components/features/repeatoptions/repeatype/SelectRepeatSet"
import WeeklyRepeatSet from "@/view/page/goal/components/features/repeatoptions/repeatype/WeeklyRepeatSet"
import YearlyRepeatSet from "@/view/page/goal/components/features/repeatoptions/repeatype/YearlyRepeatSet"

export default function RepeatInfoSet() {
	const { repeatType } = useGoalInfoStore()

	switch (repeatType) {
		case RepeatType.ALWAYS:
			return <></>
		case RepeatType.WEEKLY:
			return <WeeklyRepeatSet />
		case RepeatType.MONTHLY:
			return <MonthlyRepeatSet />
		case RepeatType.YEARLY:
			return <YearlyRepeatSet />
		case RepeatType.SELECT:
			return <SelectRepeatSet />
		default:
			return <></>
	}
}
