import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type GetGoalListResponseDto from "@/model/goal/dto/response/getGoalListResponseDto"
import type { GoalService } from "@/model/goal/service/goalService"
import useDialogStore from "@/store/layouts/dialogStore"
import type { Logger } from "@/util/logger/logger"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

const log: Logger = container.resolve(ContainerSet.LOGGER)
const goalService: GoalService = container.resolve(ContainerSet.GOAL_SERVICE)

export default function useGoalListViewModel() {
	const navigate = useNavigate()
	const { t } = useTranslation()

	const { dialogOpen } = useDialogStore()

	const [goalList, setGoalList] = useState<GetGoalListResponseDto[]>([])

	async function getGoalList() {
		await goalService
			.getGoalList()
			.then((responseList: GetGoalListResponseDto[]) => {
				setGoalList(responseList)
			})
			.catch((error) => {
				log.error("getGoalList error: ", error)
				dialogOpen(
					"ERROR",
					t(
						"viewmodel:goal.useGoalListViewModel.error.getGoalList_error"
					),
					{
						onClose: () => {
							navigate(RouterLocaleSet.DASHBOARD_PAGE)
						}
					}
				)
			})
	}

	function goUpdateGoalPage(goalId: number) {
		navigate(RouterLocaleSet.GOAL_UPDATE_PAGE(goalId))
	}

	async function doDeleteGoal(goalId: number) {
		dialogOpen(
			"CONFIRM",
			t("viewmodel:goal.useGoalListViewModel.confirm.deleteGoal"),
			{
				onCheck: onCheckHandler
			}
		)

		async function onCheckHandler() {
			await goalService
				.deleteGoal(goalId)
				.then(async () => {
					dialogOpen(
						"ALERT",
						t(
							"viewmodel:goal.useGoalListViewModel.alert.deleteGoal_success"
						),
						{
							onClose: () => {
								getGoalList()
							}
						}
					)
				})
				.catch((error) => {
					log.error("doDeleteGoal error: ", error)
					dialogOpen(
						"ERROR",
						t(
							"viewmodel:goal.useGoalListViewModel.error.deleteGoal_error"
						)
					)
				})
		}
	}

	return {
		goalList,
		getGoalList,
		goUpdateGoalPage,
		doDeleteGoal
	}
}
