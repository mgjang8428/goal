import GoalList from "@/view/page/goal/main/components/GoalList"
import useGoalListViewModel from "@/viewmodel/goal/useGoalListViewModel"
import { createContext, useEffect } from "react"
import { NavLink } from "react-router"

export interface GoalListItemButtonFunctionContextType {
    update: (goalId: number) => void
    delete: (goalId: number) => Promise<void>
}
export const GoalListItemButtonFunctionContext = createContext<GoalListItemButtonFunctionContextType | null>(null)

export default function GoalPage() {

    const {
        goalList,
        getGoalList,
        goUpdateGoalPage,
        doDeleteGoal
    } = useGoalListViewModel()

    useEffect(() => {
        getGoalList()
    }, [])

    return (
        <>
            <h1>Goal Page</h1>
            <NavLink to={"/goal/create"}>
                <p>Create</p>
            </NavLink>
            <GoalListItemButtonFunctionContext
                value={{
                    update: goUpdateGoalPage,
                    delete: doDeleteGoal
                }}
            >
                <GoalList goalList={goalList} />
            </GoalListItemButtonFunctionContext>
            <button onClick={() => getGoalList()}>새로고침</button>
        </>
    )
}
