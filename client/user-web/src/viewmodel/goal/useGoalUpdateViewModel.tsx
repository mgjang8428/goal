import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type GetGoalDetailResponseDto from "@/model/goal/dto/response/getGoalDetailResponseDto"
import type { GoalService } from "@/model/goal/service/goalService"
import type { Logger } from "@/util/logger/logger"
import { useState } from "react"
import { useNavigate } from "react-router"

const log: Logger = container.resolve(ContainerSet.LOGGER)
const goalService: GoalService = container.resolve(ContainerSet.GOAL_SERVICE)

export default function useGoalUpdateViewModel() {

    const navigate = useNavigate()

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
                alert("목표 정보 가져오기 에러")
            })
    }

    async function updateGoal() {
        if (!confirm("목표를 수정할까요?")) return

        await goalService.updateGoal(goalId, title, content)
            .then(() => {
                alert("정보 업데이트 성공")
                navigate(RouterLocaleSet.GOAL_PAGE)
            })
            .catch((error) => {
                log.error("updateGoal error: ", error)
                alert("정보 업데이트 실패")
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
