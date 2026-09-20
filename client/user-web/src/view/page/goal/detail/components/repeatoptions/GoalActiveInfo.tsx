import useGoalInfoStore from "@/store/goal/goalInfoStore"

export default function GoalActiveInfo() {
	const { isActive } = useGoalInfoStore()
	return (
		<>
			<p>
				활성화 여부
				<span>
					<input type="checkbox" checked={isActive} readOnly={true} />
				</span>
			</p>
		</>
	)
}
