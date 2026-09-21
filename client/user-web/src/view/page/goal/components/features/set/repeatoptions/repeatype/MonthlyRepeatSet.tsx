import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useState, type ChangeEvent } from "react"
import { useTranslation } from "react-i18next"

export default function MonthlyRepeatSet() {
	const { t } = useTranslation()
	const {
		monthRepeatInfo,
		setMonthRepeatInfoSetDate,
		setMonthRepeatInfoDeleteDate
	} = useGoalInfoStore()

	const [date, setDate] = useState(1)

	function dateOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
		let value = Number(event.target.value)
		if (value <= 0) {
			value = 1
		}
		if (value >= 31) {
			value = 31
		}
		setDate(value)
	}

	return (
		<>
			<p>
				{t(
					"goal_components:set.repeatoptions.repeatype.monthlyRepeat.label"
				)}
			</p>
			<input
				type="number"
				value={date}
				onChange={dateOnChangeHandler}
				min={1}
				max={31}
			/>
			<button
				type="button"
				onClick={() => {
					setMonthRepeatInfoSetDate(date)
				}}
			>
				{t(
					"goal_components:set.repeatoptions.repeatype.monthlyRepeat.button.add_button"
				)}
			</button>
			<p>
				{t(
					"goal_components:set.repeatoptions.repeatype.monthlyRepeat.table.label"
				)}
			</p>
			<table className="border">
				<thead>
					<tr className="border">
						<td className="border">
							{t(
								"goal_components:set.repeatoptions.repeatype.monthlyRepeat.table.header"
							)}
						</td>
						<td className="border">
							{t(
								"goal_components:set.repeatoptions.repeatype.monthlyRepeat.table.delete_button_header"
							)}
						</td>
					</tr>
				</thead>
				<tbody>
					{monthRepeatInfo.map((date: number) => (
						<tr key={`monthRepeatSet_${date}`} className="border">
							<td className="border">
								{date}
								{t(
									"goal_components:set.repeatoptions.repeatype.monthlyRepeat.table.item_type"
								)}
							</td>
							<td className="border">
								<button
									type="button"
									onClick={() => {
										setMonthRepeatInfoDeleteDate(date)
									}}
								>
									{t(
										"goal_components:set.repeatoptions.repeatype.monthlyRepeat.table.delete_button"
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
