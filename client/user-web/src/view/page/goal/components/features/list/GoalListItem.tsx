import { RouterLocaleSet } from "@/config/route/router"
import RepeatType from "@/model/goal/const/repeatType"
import {
	GoalListItemButtonFunctionContext,
	type GoalListItemButtonFunctionContextType
} from "@/view/page/goal/GoalListItemButtonFunctionContext"
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
				return t("goal_components:list.repeatTypeToMessage.default")
			case RepeatType.ALWAYS:
				return t("goal_components:list.repeatTypeToMessage.always")
			case RepeatType.WEEKLY:
				return t("goal_components:list.repeatTypeToMessage.weekly")
			case RepeatType.MONTHLY:
				return t("goal_components:list.repeatTypeToMessage.monthly")
			case RepeatType.YEARLY:
				return t("goal_components:list.repeatTypeToMessage.yearly")
			case RepeatType.SELECT:
				return t("goal_components:list.repeatTypeToMessage.select")
			default:
				return t("goal_components:list.repeatTypeToMessage.default")
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
					{t("goal_components:list.list_item_button.update")}
				</button>
			</td>
			<td>
				<button onClick={deleteButtonHandler}>
					{t("goal_components:list.list_item_button.delete")}
				</button>
			</td>
		</tr>
	)
}
