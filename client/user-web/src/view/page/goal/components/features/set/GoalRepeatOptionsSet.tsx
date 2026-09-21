import GoalActiveSet from "@/view/page/goal/components/features/set/repeatoptions/GoalActiveSet"
import GoalRepeatSet from "@/view/page/goal/components/features/set/repeatoptions/GoalRepeatSet"
import GoalStartEndDateSet from "@/view/page/goal/components/features/set/repeatoptions/GoalStartEndDateSet"

export default function GoalRepeatOptions() {
	return (
		<>
			<GoalActiveSet />
			<br />
			<GoalStartEndDateSet />
			<br />
			<GoalRepeatSet />
		</>
	)
}
