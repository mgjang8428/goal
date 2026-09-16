import container, { ContainerSet } from "@/config/di/container"
import { RouterLocaleSet } from "@/config/route/router"
import RepeatType from "@/model/goal/const/repeatType"
import type RepeatInfoRequestDto from "@/model/goal/dto/request/repeatInfoRequestDto"
import type { GoalService } from "@/model/goal/service/goalService"
import useGoalInfoStore, { type WeekRepeatSetCheck } from "@/store/goal/goalInfoStore"
import type { Logger } from "@/util/logger/logger"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

const log: Logger = container.resolve(ContainerSet.LOGGER)
const goalService: GoalService = container.resolve(ContainerSet.GOAL_SERVICE)

export default function useGoalCreateViewModel() {

    const navigate = useNavigate()
    const { t } = useTranslation("noti")

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

    async function goalCreate() {
        if (!confirm(t("goalcreate_viewmodel.goalcreate_confirm"))) return

        const repeatInfo: RepeatInfoRequestDto[] = makeRepeatInfoArray(
            repeatType,
            weekRepeatInfo,
            monthRepeatInfo,
            yearRepeatInfo,
            selectRepeatInfo
        )

        await goalService.create(
            title,
            content,
            isActive,
            startDate,
            endDate,
            repeatType,
            repeatInfo
        ).then(() => {
            alert(t("goalcreate_viewmodel.goalcreate_then_alert"))
            initAllStoreData()
            navigate(RouterLocaleSet.GOAL_PAGE)
        }).catch((error) => {
            log.error("goalCreate error: ", error)
            alert(t("goalcreate_viewmodel.goalcreate_error_alert"))
        })
    }

    return {
        goalCreate
    }
}


function makeRepeatInfoArray(
    repeatType: string,
    weekRepeatInfo: WeekRepeatSetCheck,
    monthRepeatInfo: number[],
    yearRepeatInfo: string[],
    selectRepeatInfo: string[]
): RepeatInfoRequestDto[] {

    let repeatInfo: RepeatInfoRequestDto[] = []

    switch (repeatType) {
        case RepeatType.NONE:
            break
        case RepeatType.ALWAYS:
            break
        case RepeatType.WEEKLY:
            for (const [day, value] of Object.entries(weekRepeatInfo)) {
                if (value == true) {
                    const repeatInfoRequestDto: RepeatInfoRequestDto = {
                        weekRepeatType: day,
                        monthRepeatType: null,
                        yearRepeatMonth: null,
                        yearRepeatDate: null,
                        selectRepeat: null,
                    }
                    repeatInfo.push(repeatInfoRequestDto)
                }
            }
            break
        case RepeatType.MONTHLY:
            monthRepeatInfo.forEach((date: number) => {
                const repeatInfoRequestDto: RepeatInfoRequestDto = {
                    weekRepeatType: null,
                    monthRepeatType: date,
                    yearRepeatMonth: null,
                    yearRepeatDate: null,
                    selectRepeat: null,
                }
                repeatInfo.push(repeatInfoRequestDto)
            })
            break
        case RepeatType.YEARLY:
            yearRepeatInfo.forEach((rawDate: string) => {

                const rawDateFormat = /(\d{1,2})월\s*(\d{1,2})일/

                const match = rawDate.match(rawDateFormat);

                let month: number | null
                let date: number | null

                if (match) {
                    month = Number(match[1]);
                    date = Number(match[2]);
                } else throw new Error("문자열 포멧 에러")

                const repeatInfoRequestDto: RepeatInfoRequestDto = {
                    weekRepeatType: null,
                    monthRepeatType: null,
                    yearRepeatMonth: month,
                    yearRepeatDate: date,
                    selectRepeat: null,
                }
                repeatInfo.push(repeatInfoRequestDto)
            })
            break
        case RepeatType.SELECT:
            selectRepeatInfo.forEach((date: string) => {
                const repeatInfoRequestDto: RepeatInfoRequestDto = {
                    weekRepeatType: null,
                    monthRepeatType: null,
                    yearRepeatMonth: null,
                    yearRepeatDate: null,
                    selectRepeat: date,
                }
                repeatInfo.push(repeatInfoRequestDto)
            })
            break
        default:
            throw new Error()
    }
    return repeatInfo
}