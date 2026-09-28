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

export default function useGoalCreateViewModel() {
	const log: Logger = container.resolve(ContainerSet.LOGGER)
	const goalService: GoalService = container.resolve(
		ContainerSet.GOAL_SERVICE
	)

	const navigate = useNavigate()
	const { t } = useTranslation()

	const {
		initAllStoreData,
		title,
		content,
		startDate,
		endDate,
		repeatType,
		weekRepeatInfo,
		monthRepeatInfo,
		yearRepeatInfo,
		selectRepeatInfo,
		isActive
	} = useGoalInfoStore()

	const { dialogOpen } = useDialogStore()

	async function goalCreate() {
		dialogOpen(
			"CONFIRM",
			t("viewmodel:goal.useGoalCreateViewModel.confirm.goalCreate"),
			{
				onCheck: onCheckHandler
			}
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
				.create(
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
							"viewmodel:goal.useGoalCreateViewModel.alert.goalCreate_success"
						),
						{
							onClose: () => {
								initAllStoreData()
								navigate(RouterLocaleSet.GOAL_PAGE)
							}
						}
					)
				})
				.catch((error) => {
					log.error("goalCreate error: ", error)
					dialogOpen(
						"ERROR",
						t(
							"viewmodel:goal.useGoalCreateViewModel.error.goalCreate_failed"
						)
					)
				})
		}
	}

	return {
		goalCreate
	}
}
