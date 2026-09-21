import { createContext } from "react"

export interface GoalListItemButtonFunctionContextType {
	update: (goalId: number) => void
	delete: (goalId: number) => Promise<void>
}

export const GoalListItemButtonFunctionContext =
	createContext<GoalListItemButtonFunctionContextType | null>(null)
