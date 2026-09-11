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

    function updateButtonHandler() {
        buttonFunction?.update(goalId)
    }

    function deleteButtonHandler() {
        buttonFunction?.delete(goalId)
    }

    return (
        <tr>
            <td>
                <NavLink
                    to={RouterLocaleSet.GOAL_DETAIL_PAGE(goalId)}
                >
                    {title}
                </NavLink>
            </td>
            <td>
                <button
                    onClick={updateButtonHandler}
                    children={t("page.goal.main.goal_list_item.update_btn")}
                />
            </td>
            <td>
                <button
                    onClick={deleteButtonHandler}
                    children={t("page.goal.main.goal_list_item.delete_btn")}
                />
            </td>
        </tr>
    )
}
