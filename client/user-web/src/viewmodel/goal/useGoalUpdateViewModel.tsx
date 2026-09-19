import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type RepeatInfoRequestDto from "@/model/goal/dto/request/repeatInfoRequestDto"
import type { GoalService } from "@/model/goal/service/goalService"
import useGoalInfoStore from "@/store/goal/goalInfoStore"
import type { Logger } from "@/util/logger/logger"
import { makeRepeatInfoArray } from "@/viewmodel/goal/util/makeRepeatInfoArray"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

export default function useGoalUpdateViewModel() {

    const log: Logger = container.resolve(ContainerSet.LOGGER)
    const goalService: GoalService = container.resolve(ContainerSet.GOAL_SERVICE)

    const navigate = useNavigate()
    const { t } = useTranslation('noti')

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
        selectRepeatInfo,
    } = useGoalInfoStore()

    async function updateGoal() {
        if (!confirm(t("goalupdate_viewmodel.updategoal_confirm"))) return

        const repeatInfo: RepeatInfoRequestDto[] = makeRepeatInfoArray(
            repeatType,
            weekRepeatInfo,
            monthRepeatInfo,
            yearRepeatInfo,
            selectRepeatInfo
        )

        await goalService.updateGoal(
            goalId,
            title,
            content,
            isActive,
            startDate,
            endDate,
            repeatType,
            repeatInfo
        ).then(() => {
            alert(t("goalupdate_viewmodel.updategoal_then_alert"))
            navigate(RouterLocaleSet.GOAL_PAGE)
        }).catch((error) => {
            log.error("updateGoal error: ", error)
            alert(t("goalupdate_viewmodel.updategoal_catch_alert"))
        })
    }

    return {
        updateGoal
    }
}
