import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useTranslation } from "react-i18next"

export default function MonthlyRepeatInfo() {
	const { t } = useTranslation()

	const { monthRepeatInfo } = useGoalInfoStore()

	return (
		<>
			<table className="border">
				<thead>
					<tr className="border">
						<td className="border">
							{t(
								"goal_components:info.repeatoptions.repeatype.monthlyRepeat.table_header"
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
									"goal_components:info.repeatoptions.repeatype.monthlyRepeat.table_item_type"
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
