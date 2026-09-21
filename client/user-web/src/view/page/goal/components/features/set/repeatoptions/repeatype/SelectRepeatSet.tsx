import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function SelectRepeatSet() {
	const { t } = useTranslation()

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
			<p>
				{t(
					"goal_components:set.repeatoptions.repeatype.selectRepeat.label"
				)}
			</p>
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
				{t(
					"goal_components:set.repeatoptions.repeatype.selectRepeat.button.add_button"
				)}
			</button>
			<p>
				{t(
					"goal_components:set.repeatoptions.repeatype.selectRepeat.table.label"
				)}
			</p>
			<table className="border">
				<thead>
					<tr className="border">
						<td className="border">
							{t(
								"goal_components:set.repeatoptions.repeatype.selectRepeat.table.header_date"
							)}
						</td>
						<td className="border">
							{t(
								"goal_components:set.repeatoptions.repeatype.selectRepeat.table.header_delete"
							)}
						</td>
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
									{t(
										"goal_components:set.repeatoptions.repeatype.selectRepeat.table.delete_button"
									)}
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
