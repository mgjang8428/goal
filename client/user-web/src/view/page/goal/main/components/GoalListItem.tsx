import { RouterLocaleSet } from "@/config/route/router"
import RepeatType from "@/model/goal/const/repeatType"
import {
	GoalListItemButtonFunctionContext,
	type GoalListItemButtonFunctionContextType
} from "@/view/page/goal/main/GoalListItemButtonFunctionContext"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router"

export interface GoalListItemProps {
	goalId: number
	title: string
	isActive: boolean
	repeatType: string
}

export default function GoalListItem({
	goalId,
	title,
	isActive,
	repeatType
}: GoalListItemProps) {
	const buttonFunction: GoalListItemButtonFunctionContextType | null =
		useContext(GoalListItemButtonFunctionContext)
	const { t } = useTranslation()

	function repeatTypeToMessage(repeatType: string): string {
		switch (repeatType) {
			case RepeatType.NONE:
				return "없음"
			case RepeatType.ALWAYS:
				return "매일반복"
			case RepeatType.WEEKLY:
				return "주간반복"
			case RepeatType.MONTHLY:
				return "월간반복"
			case RepeatType.YEARLY:
				return "연간반복"
			case RepeatType.SELECT:
				return "선택반복"
			default:
				return "확인불가"
		}
	}

	function updateButtonHandler() {
		buttonFunction?.update(goalId)
	}

	function deleteButtonHandler() {
		buttonFunction?.delete(goalId)
	}

	return (
		<tr>
			<td>
				<NavLink to={RouterLocaleSet.GOAL_DETAIL_PAGE(goalId)}>
					{title}
				</NavLink>
			</td>
			<td>
				<input type="checkbox" checked={isActive} readOnly={true} />
			</td>
			<td>{repeatTypeToMessage(repeatType)}</td>
			<td>
				<button onClick={updateButtonHandler}>
					{t("page.goal.main.goal_list_item.update_btn")}
				</button>
			</td>
			<td>
				<button onClick={deleteButtonHandler}>
					{t("page.goal.main.goal_list_item.delete_btn")}
				</button>
			</td>
		</tr>
	)
}
