import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import type { GoalService } from "@/model/goal/service/goalService"
import type { Logger } from "@/util/logger/logger"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

const log: Logger = container.resolve(ContainerSet.LOGGER)
const goalService: GoalService = container.resolve(ContainerSet.GOAL_SERVICE)

export default function useGoalCreateViewModel() {

    const navigate = useNavigate()
    const { t } = useTranslation("noti")

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    async function goalCreate() {
        if(!confirm(t("goalcreate_viewmodel.goalcreate_confirm"))) return

        await goalService.create(title, content)
            .then(() => {
                alert(t("goalcreate_viewmodel.goalcreate_then_alert"))
                navigate(RouterLocaleSet.GOAL_PAGE)
            })
            .catch((error) => {
                log.error("goalCreate error: ", error)
                alert(t("goalcreate_viewmodel.goalcreate_error_alert"))
            })
    }

    return {
        title, setTitle,
        content, setContent,
        goalCreate
    }
}
