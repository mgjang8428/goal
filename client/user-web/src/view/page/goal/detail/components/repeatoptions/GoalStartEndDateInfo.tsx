import useGoalInfoStore from "@/store/goal/goalInfoStore"

export default function GoalStartEndDateInfo() {
	const { startDate, isEndDate, endDate } = useGoalInfoStore()
	return (
		<>
			<p>
				시작일:
				<span>{startDate}</span>
			</p>
			<p>
				끝일:
				<span>{isEndDate ? endDate : "-"}</span>
			</p>
		</>
	)
}
