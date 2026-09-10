import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type { GoalService } from "@/model/goal/service/goalService"
import type { Logger } from "@/util/logger/logger"
import { useState } from "react"
import { useNavigate } from "react-router"

const log: Logger = container.resolve(ContainerSet.LOGGER)
const goalService: GoalService = container.resolve(ContainerSet.GOAL_SERVICE)

export default function useGoalCreateViewModel() {

    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    async function goalCreate() {
        if(!confirm("목표를 생성할까요?")) return

        await goalService.create(title, content)
            .then(() => {
                alert("목표생성완료")
                navigate(RouterLocaleSet.GOAL_PAGE)
            })
            .catch((error) => {
                log.error("goalCreate error: ", error)
                alert("목표생성실패")
            })
    }

    return {
        title, setTitle,
        content, setContent,
        goalCreate
    }
}
