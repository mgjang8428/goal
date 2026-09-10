import { RouterLocaleSet } from "@/config/route/router"
import { GoalListItemButtonFunctionContext, type GoalListItemButtonFunctionContextType } from "@/view/page/goal/main/GoalPage"
import { useContext } from "react"
import { NavLink } from "react-router"

export interface GoalListItemProps {
    goalId: number
    title: string
}

export default function GoalListItem({ goalId, title }: GoalListItemProps) {
    const buttonFunction: GoalListItemButtonFunctionContextType | null = useContext(GoalListItemButtonFunctionContext)
    return (
        <tr>
            <td>
                <NavLink to={RouterLocaleSet.GOAL_DETAIL_PAGE(goalId)}>
                    {title}
                </NavLink>
            </td>
            <td>
                <button onClick={() => { buttonFunction?.update(goalId) }}>수정</button>
            </td>
            <td>
                <button onClick={() => { buttonFunction?.delete(goalId) }}>삭제</button>
            </td>
        </tr>
    )
}
