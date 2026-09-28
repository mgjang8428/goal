import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type RepeatInfoRequestDto from "@/model/goal/dto/request/repeatInfoRequestDto"
import type { GoalService } from "@/model/goal/service/goalService"
import useGoalInfoStore from "@/store/goal/goalInfoStore"
import useDialogStore from "@/store/layouts/dialogStore"
import type { Logger } from "@/util/logger/logger"
import { makeRepeatInfoArray } from "@/viewmodel/goal/util/makeRepeatInfoArray"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

export default function useGoalUpdateViewModel() {
	const log: Logger = container.resolve(ContainerSet.LOGGER)
	const goalService: GoalService = container.resolve(
		ContainerSet.GOAL_SERVICE
	)

	const navigate = useNavigate()
	const { t } = useTranslation()

	const {
		goalId,
		title,
		content,
		startDate,
		endDate,
		isActive,

		repeatType,
		weekRepeatInfo,
		monthRepeatInfo,
		yearRepeatInfo,
		selectRepeatInfo
	} = useGoalInfoStore()

	const { dialogOpen } = useDialogStore()

	async function updateGoal() {
		dialogOpen(
			"CONFIRM",
			t("viewmodel:goal.useGoalUpdateViewModel.confirm.updateGoal"),
			{ onCheck: onCheckHandler }
		)

		async function onCheckHandler() {
			const repeatInfo: RepeatInfoRequestDto[] = makeRepeatInfoArray(
				repeatType,
				weekRepeatInfo,
				monthRepeatInfo,
				yearRepeatInfo,
				selectRepeatInfo
			)

			await goalService
				.updateGoal(
					goalId,
					title,
					content,
					isActive,
					startDate,
					endDate,
					repeatType,
					repeatInfo
				)
				.then(() => {
					dialogOpen(
						"ALERT",
						t(
							"viewmodel:goal.useGoalUpdateViewModel.alert.updateGoal_success"
						),
						{
							onClose: () => {
								navigate(RouterLocaleSet.GOAL_PAGE)
							}
						}
					)
				})
				.catch((error) => {
					log.error("updateGoal error: ", error)
					dialogOpen(
						"ERROR",
						t(
							"viewmodel:goal.useGoalUpdateViewModel.error.updateGoal_error"
						)
					)
				})
		}
	}

	return {
		updateGoal
	}
}
