import useGoalInfoStore from "@/store/goal/goalInfoStore"

export default function YearlyRepeatInfo() {
	const { yearRepeatInfo } = useGoalInfoStore()
	return (
		<>
			<table className="border">
				<thead>
					<tr className="border">
						<td className="border">반복일</td>
					</tr>
				</thead>
				<tbody>
					{yearRepeatInfo.map((date) => (
						<tr key={`yearRepeatSet_${date}`} className="border">
							<td className="border">{date}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
