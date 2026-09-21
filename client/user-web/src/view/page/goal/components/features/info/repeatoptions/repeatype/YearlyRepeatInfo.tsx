import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useTranslation } from "react-i18next"

export default function YearlyRepeatInfo() {
	const { t } = useTranslation()
	const { yearRepeatInfo } = useGoalInfoStore()
	return (
		<>
			<table className="border">
				<thead>
					<tr className="border">
						<td className="border">
							{t(
								"goal_components:info.repeatoptions.repeatype.yearlyRepeat.table_header"
							)}
						</td>
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
