import { RouterLocaleSet } from "@/config/route/router"
import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useNavigate } from "react-router"

export default function useGoalDetailViewModel() {
	const navigate = useNavigate()

	const { goalId } = useGoalInfoStore()

	function goUpdateGoalPage() {
		navigate(RouterLocaleSet.GOAL_UPDATE_PAGE(goalId))
	}

	return {
		goUpdateGoalPage
	}
}
