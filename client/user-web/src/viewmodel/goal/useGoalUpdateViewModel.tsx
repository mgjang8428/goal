import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type GetGoalDetailResponseDto from "@/model/goal/dto/response/getGoalDetailResponseDto"
import type { GoalService } from "@/model/goal/service/goalService"
import type { Logger } from "@/util/logger/logger"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

const log: Logger = container.resolve(ContainerSet.LOGGER)
const goalService: GoalService = container.resolve(ContainerSet.GOAL_SERVICE)

export default function useGoalUpdateViewModel() {

    const navigate = useNavigate()
    const { t } = useTranslation()

    const [goalId, setGoalId] = useState(0)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    async function getGoalDetail(goalId: number) {
        await goalService.getGoalDetail(goalId)
            .then((responseInfo: GetGoalDetailResponseDto) => {
                setTitle(responseInfo.title)
                setContent(responseInfo.content)
            })
            .catch((error) => {
                log.error("getGoalDetail error: ", error)
                alert(t("goalupdate_viewmodel.getgoaldetail_catch_alert"))
            })
    }

    async function updateGoal() {
        if (!confirm(t("goalupdate_viewmodel.getgoaldetail_catch_alert"))) return

        await goalService.updateGoal(goalId, title, content)
            .then(() => {
                alert(t("goalupdate_viewmodel.updategoal_then_alert"))
                navigate(RouterLocaleSet.GOAL_PAGE)
            })
            .catch((error) => {
                log.error("updateGoal error: ", error)
                alert(t("goalupdate_viewmodel.updategoal_catch_alert"))
            })
    }

    return {
        setGoalId,
        title, setTitle,
        content, setContent,
        getGoalDetail,
        updateGoal
    }
}
