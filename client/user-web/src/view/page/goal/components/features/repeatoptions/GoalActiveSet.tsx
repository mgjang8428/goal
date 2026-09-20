import useGoalInfoStore from "@/store/goal/goalInfoStore"

export default function GoalActiveSet() {
	const { isActive, setIsActive } = useGoalInfoStore()

	return (
		<label>
			활성화:
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
