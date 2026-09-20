import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useState } from "react"

export default function SelectRepeatSet() {
	const {
		selectRepeatInfo,
		setSelectRepeatInfoSetDate,
		setSelectRepeatInfoDeleteDate
	} = useGoalInfoStore()

	const now = new Date()
	const nowYear = now.getFullYear()
	const nowMonth = String(now.getMonth() + 1).padStart(2, "0")
	const nowDate = String(now.getDate()).padStart(2, "0")
	const nowFormat = `${nowYear}-${nowMonth}-${nowDate}`

	const [date, setDate] = useState(nowFormat)

	return (
		<>
			<p>지정반복 날짜선택</p>
			<input
				type="date"
				value={date}
				onChange={(event) => {
					setDate(event.target.value)
				}}
			/>
			<button
				type="button"
				onClick={() => {
					setSelectRepeatInfoSetDate(date)
				}}
			>
				추가
			</button>
			<p>추가된 반복일</p>
			<table className="border">
				<thead>
					<tr className="border">
						<td className="border">반복일</td>
						<td className="border">삭제</td>
					</tr>
				</thead>
				<tbody>
					{selectRepeatInfo.map((date) => (
						<tr key={`yearRepeatSet_${date}`} className="border">
							<td className="border">{date}</td>
							<td className="border">
								<button
									className="border"
									type="button"
									onClick={() => {
										setSelectRepeatInfoDeleteDate(date)
									}}
								>
									X
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
