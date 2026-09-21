import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useTranslation } from "react-i18next"

export default function SelectRepeatInfo() {
	const { t } = useTranslation()
	const { selectRepeatInfo } = useGoalInfoStore()

	return (
		<>
			<table className="border">
				<thead>
					<tr className="border">
						<td className="border">
							{t(
								"goal_components:info.repeatoptions.repeatype.weeklyRepeat.table_header"
							)}
						</td>
					</tr>
				</thead>
				<tbody>
					{selectRepeatInfo.map((date) => (
						<tr key={`yearRepeatSet_${date}`} className="border">
							<td className="border">{date}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
