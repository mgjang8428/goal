import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function YearlyRepeatSet() {
	const { t } = useTranslation()

	const {
		yearRepeatInfo,
		setYearRepeatInfoSetDate,
		setYearRepeatInfoDeleteDate
	} = useGoalInfoStore()

	// const monthType = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
	const monthType = Array.from({ length: 12 }, (_, i) =>
		String(i + 1).padStart(2, "0")
	)
	const dateType = Array.from({ length: 31 }, (_, i) =>
		String(i + 1).padStart(2, "0")
	)

	const [monthValue, setMonthValue] = useState("01")
	const [dateValue, setDateValue] = useState("01")

	return (
		<>
			<p>
				{t(
					"goal_components:set.repeatoptions.repeatype.yearlyRepeat.label"
				)}
			</p>
			<select
				className="border"
				value={monthValue}
				onChange={(event) => {
					setMonthValue(event.target.value)
				}}
			>
				{monthType.map((month) => (
					<option key={`month_select_${month}`} value={month}>
						{`${month}${t("goal_components:set.repeatoptions.repeatype.yearlyRepeat.select.option_month")}`}
					</option>
				))}
			</select>
			<select
				className="border"
				value={dateValue}
				onChange={(event) => {
					setDateValue(event.target.value)
				}}
			>
				{dateType.map((date) => (
					<option key={`date_select_${date}`} value={date}>
						{`${date}${t("goal_components:set.repeatoptions.repeatype.yearlyRepeat.select.option_date")}`}
					</option>
				))}
			</select>
			<button
				type="button"
				onClick={() => {
					setYearRepeatInfoSetDate(monthValue, dateValue)
				}}
			>
				{t(
					"goal_components:set.repeatoptions.repeatype.yearlyRepeat.button.add_button"
				)}
			</button>
			<p>
				{t(
					"goal_components:set.repeatoptions.repeatype.yearlyRepeat.table.label"
				)}
			</p>
			<table className="border">
				<thead>
					<tr className="border">
						<td className="border">
							{t(
								"goal_components:set.repeatoptions.repeatype.yearlyRepeat.table.header_date"
							)}
						</td>
						<td className="border">
							{t(
								"goal_components:set.repeatoptions.repeatype.yearlyRepeat.table.header_delete"
							)}
						</td>
					</tr>
				</thead>
				<tbody>
					{yearRepeatInfo.map((date) => (
						<tr key={`yearRepeatSet_${date}`} className="border">
							<td className="border">{date}</td>
							<td className="border">
								<button
									className="border"
									type="button"
									onClick={() => {
										setYearRepeatInfoDeleteDate(date)
									}}
								>
									{t(
										"goal_components:set.repeatoptions.repeatype.yearlyRepeat.table.delete_button"
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
