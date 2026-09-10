import { RouterLocaleSet } from "@/config/route/router"
import { GoalListItemButtonFunctionContext, type GoalListItemButtonFunctionContextType } from "@/view/page/goal/main/GoalPage"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router"

export interface GoalListItemProps {
    goalId: number
    title: string
}

export default function GoalListItem({ goalId, title }: GoalListItemProps) {
    const buttonFunction: GoalListItemButtonFunctionContextType | null = useContext(GoalListItemButtonFunctionContext)
    const { t } = useTranslation()
    return (
        <tr>
            <td>
                <NavLink to={RouterLocaleSet.GOAL_DETAIL_PAGE(goalId)}>
                    {title}
                </NavLink>
            </td>
            <td>
                <button onClick={() => { buttonFunction?.update(goalId) }}>{t("page.goal.main.goal_list_item.update_btn")}</button>
            </td>
            <td>
                <button onClick={() => { buttonFunction?.delete(goalId) }}>{t("page.goal.main.goal_list_item.delete_btn")}</button>
            </td>
        </tr>
    )
}
