import GoalActiveInfo from "@/view/page/goal/components/features/info/repeatoptions/GoalActiveInfo"
import GoalRepeatInfo from "@/view/page/goal/components/features/info/repeatoptions/GoalRepeatInfo"
import GoalStartEndDateInfo from "@/view/page/goal/components/features/info/repeatoptions/GoalStartEndDateInfo"

export default function GoalRepeatOptionsInfo() {
	return (
		<>
			<GoalActiveInfo />
			<GoalStartEndDateInfo />
			<GoalRepeatInfo />
		</>
	)
}
