import container, { ContainerSet } from "@/config/di/container"
import RepeatType from "@/model/goal/const/repeatType"
import type GetGoalDetailResponseDto from "@/model/goal/dto/response/getGoalDetailResponseDto"
import type RepeatInfoResponseDto from "@/model/goal/dto/response/repeatInfoResponseDto"
import type { GoalService } from "@/model/goal/service/goalService"
import useGoalInfoStore, { weekRepeatDefaultValue, type WeekRepeatSetCheck } from "@/store/goal/goalInfoStore"
import type logger from "@/util/logger/logger"
import { useTranslation } from "react-i18next"

export default function useGetGoalInfoViewModel() {

    const { t } = useTranslation('noti')
    const log: logger = container.resolve(ContainerSet.LOGGER)
    const goalService: GoalService = container.resolve(ContainerSet.GOAL_SERVICE)

    const {
        initAllStoreData,
        setAllStoreData
    } = useGoalInfoStore()

    async function getGoalInfo(goalId: number) {
        await goalService.getGoalDetail(goalId)
            .then((responseDto: GetGoalDetailResponseDto) => {
                // goal info store 초기화
                initAllStoreData()
                // goal info store data set
                setStoreRepeatInfo(responseDto)
            })
            .catch((error) => {
                log.error("getGoalDetail error: ", error)
                alert(t("goalupdate_viewmodel.getgoaldetail_catch_alert"))
            })
    }

    function setStoreRepeatInfo(responseDto: GetGoalDetailResponseDto) {
        // goal repeat array make
        let weekRepeatInfo: WeekRepeatSetCheck = weekRepeatDefaultValue
        let monthRepeatInfo: number[] = []
        let yearRepeatInfo: string[] = []
        let selectRepeatInfo: string[] = []

        // make repeat array & store
        switch (responseDto.repeatType) {
            case RepeatType.NONE:
                break
            case RepeatType.ALWAYS:
                break
            case RepeatType.WEEKLY:
                responseDto.repeatInfo.forEach((repeatDto: RepeatInfoResponseDto) => {
                    if (repeatDto.weekRepeatType !== null) {
                        let weekType: keyof WeekRepeatSetCheck = repeatDto.weekRepeatType as keyof WeekRepeatSetCheck
                        weekRepeatInfo[weekType] = true
                    }
                })
                break
            case RepeatType.MONTHLY:
                responseDto.repeatInfo.forEach((repeatDto: RepeatInfoResponseDto) => {
                    if (repeatDto.monthRepeatNum !== null) {
                        monthRepeatInfo.push(repeatDto.monthRepeatNum!)
                    }
                })
                break
            case RepeatType.YEARLY:
                responseDto.repeatInfo.forEach((repeatDto: RepeatInfoResponseDto) => {
                    const parsingDate = `${String(repeatDto.yearRepeatMonth).padStart(2, '0')}월${String(repeatDto.yearRepeatDate).padStart(2, '0')}일`
                    yearRepeatInfo.push(parsingDate)
                })
                break
            case RepeatType.SELECT:
                responseDto.repeatInfo.forEach((repeatDto: RepeatInfoResponseDto) => {
                    selectRepeatInfo.push(repeatDto.selectRepeat!)
                })
                break
            default:
                break
        }

        // data set
        setAllStoreData(
            responseDto.goalId,
            responseDto.title,
            responseDto.content,
            responseDto.startDate,
            responseDto.endDate,
            // isEndDate
            responseDto.endDate == null,
            // isGoalRepeat
            responseDto.repeatType != RepeatType.NONE,
            // isActive
            responseDto.isActive,
            // repeat
            responseDto.repeatType,
            weekRepeatInfo,
            monthRepeatInfo,
            yearRepeatInfo,
            selectRepeatInfo
        )
    }

    return {
        getGoalInfo
    }
}

