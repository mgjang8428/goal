import { RouterLocaleSet } from "@/config/route/router"
import CNavLink from "@/view/layouts/components/CNavLink"
import GoalList from "@/view/page/goal/components/features/list/GoalList"
import { GoalListItemButtonFunctionContext } from "@/view/page/goal/GoalListItemButtonFunctionContext"
import useGoalListViewModel from "@/viewmodel/goal/useGoalListViewModel"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function GoalPage() {
	const { t } = useTranslation()

	const { goalList, getGoalList, goUpdateGoalPage, doDeleteGoal } =
		useGoalListViewModel()

	useEffect(() => {
		getGoalList()
	}, [getGoalList])

	function reloadButtonHandler() {
		getGoalList()
	}

	return (
		<>
			<h1>{t("goal_page:main.title")}</h1>
			<div className="w-fit h-fit">
				<CNavLink to={RouterLocaleSet.GOAL_CREATE_PAGE}>
					<p>{t("goal_page:main.link.create")}</p>
				</CNavLink>
			</div>
			<button onClick={reloadButtonHandler}>
				{t("goal_page:main.button.reload_goal_list")}
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
