import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type GetGoalListResponseDto from "@/model/goal/dto/response/getGoalListResponseDto"
import type { GoalService } from "@/model/goal/service/goalService"
import type { Logger } from "@/util/logger/logger"
import { useState } from "react"
import { useNavigate } from "react-router"

const log: Logger = container.resolve(ContainerSet.LOGGER)
const goalService: GoalService = container.resolve(ContainerSet.GOAL_SERVICE)

export default function useGoalListViewModel() {

    const navigate = useNavigate()

    const [goalList, setGoalList] = useState<GetGoalListResponseDto[]>([])

    async function getGoalList() {
        await goalService.getGoalList()
            .then((responseList: GetGoalListResponseDto[]) => {
                setGoalList(responseList)
            })
            .catch((error) => {
                log.error("getGoalList error: ", error)
                alert("목표 리스트 가져오기 실패")
            })
    }

    function goUpdateGoalPage(goalId: number) {
        navigate(RouterLocaleSet.GOAL_UPDATE_PAGE(goalId))
    }

    async function doDeleteGoal(goalId: number) {
        if(!confirm("목표를 삭제하시겠습니까?")) return

        await goalService.deleteGoal(goalId)
            .then(async () => {
                alert("삭제되었습니다.")
                getGoalList()
            })
            .catch((error) => {
                log.error("doDeleteGoal error: ", error)
                alert("삭제를 실패하였습니다.")
            })
    }

    return {
        goalList,
        getGoalList,
        goUpdateGoalPage,
        doDeleteGoal
    }
}
