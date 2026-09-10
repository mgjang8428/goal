import GoalList from "@/view/page/goal/main/components/GoalList"
import useGoalListViewModel from "@/viewmodel/goal/useGoalListViewModel"
import { createContext, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router"

export interface GoalListItemButtonFunctionContextType {
    update: (goalId: number) => void
    delete: (goalId: number) => Promise<void>
}
export const GoalListItemButtonFunctionContext = createContext<GoalListItemButtonFunctionContextType | null>(null)

export default function GoalPage() {

    const { t } = useTranslation()

    const {
        goalList,
        getGoalList,
        goUpdateGoalPage,
        doDeleteGoal
    } = useGoalListViewModel()

    useEffect(() => {
        getGoalList()
    }, [])

    function reloadButtonHandler() {
        getGoalList()
    }

    return (
        <>
            <h1>Goal Page</h1>
            <NavLink to={"/goal/create"}>
                <p>{t("page.goal.main.create_button")}</p>
            </NavLink>
            <button
                onClick={reloadButtonHandler}
                children={t("page.goal.main.reload_button")}
            />
            <GoalListItemButtonFunctionContext
                value={{
                    update: goUpdateGoalPage,
                    delete: doDeleteGoal
                }}
            >
                <GoalList goalList={goalList} />
            </GoalListItemButtonFunctionContext>
        </>
    )
}
