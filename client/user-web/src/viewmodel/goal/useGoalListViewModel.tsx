import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type GetGoalListResponseDto from "@/model/goal/dto/response/getGoalListResponseDto"
import type { GoalService } from "@/model/goal/service/goalService"
import type { Logger } from "@/util/logger/logger"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

const log: Logger = container.resolve(ContainerSet.LOGGER)
const goalService: GoalService = container.resolve(ContainerSet.GOAL_SERVICE)

export default function useGoalListViewModel() {

    const navigate = useNavigate()
    const { t } = useTranslation()

    const [goalList, setGoalList] = useState<GetGoalListResponseDto[]>([])

    async function getGoalList() {
        await goalService.getGoalList()
            .then((responseList: GetGoalListResponseDto[]) => {
                setGoalList(responseList)
            })
            .catch((error) => {
                log.error("getGoalList error: ", error)
                alert(t("goallist_viewmodel.getgoallist_catch_alert"))
            })
    }

    function goUpdateGoalPage(goalId: number) {
        navigate(RouterLocaleSet.GOAL_UPDATE_PAGE(goalId))
    }

    async function doDeleteGoal(goalId: number) {
        if(!confirm(t("goallist_viewmodel.dodeletegoal_confirm"))) return

        await goalService.deleteGoal(goalId)
            .then(async () => {
                alert(t("goallist_viewmodel.dodeletegoal_then_alert"))
                getGoalList()
            })
            .catch((error) => {
                log.error("doDeleteGoal error: ", error)
                alert(t("goallist_viewmodel.dodeletegoal_catch_alert"))
            })
    }

    return {
        goalList,
        getGoalList,
        goUpdateGoalPage,
        doDeleteGoal
    }
}
