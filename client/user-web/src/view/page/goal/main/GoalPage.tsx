import { RouterLocaleSet } from "@/config/route/router"
import GoalList from "@/view/page/goal/main/components/GoalList"
import { GoalListItemButtonFunctionContext } from "@/view/page/goal/main/GoalListItemButtonFunctionContext"
import useGoalListViewModel from "@/viewmodel/goal/useGoalListViewModel"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router"



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
    }, [getGoalList])

    function reloadButtonHandler() {
        getGoalList()
    }

    return (
        <>
            <h1>Goal Page</h1>
            <NavLink
                to={RouterLocaleSet.GOAL_CREATE_PAGE}
            >
                <p>{t("page.goal.main.create_button")}</p>
            </NavLink>
            <button
                onClick={reloadButtonHandler}

            >
                {t("page.goal.main.reload_button")}
            </button>
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
