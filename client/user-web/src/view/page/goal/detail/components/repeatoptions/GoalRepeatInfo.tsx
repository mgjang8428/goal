import RepeatType from "@/model/goal/const/repeatType"
import useGoalInfoStore from "@/store/goal/goalInfoStore"
import MonthlyRepeatInfo from "@/view/page/goal/detail/components/repeatoptions/repeatype/MonthlyRepeatInfo"
import SelectRepeatInfo from "@/view/page/goal/detail/components/repeatoptions/repeatype/SelectRepeatInfo"
import WeeklyRepeatInfo from "@/view/page/goal/detail/components/repeatoptions/repeatype/WeeklyRepeatInfo"
import YearlyRepeatInfo from "@/view/page/goal/detail/components/repeatoptions/repeatype/YearlyRepeatInfo"

export default function GoalRepeatInfo() {

    const {
        isGoalRepeat,
        repeatType
    } = useGoalInfoStore()

    function repeatTypeName(): string {
        switch (repeatType) {
            case RepeatType.NONE:
                return ("")
            case RepeatType.ALWAYS:
                return ("매일 반복")
            case RepeatType.WEEKLY:
                return ("주간 반복")
            case RepeatType.MONTHLY:
                return ("월간 반복")
            case RepeatType.YEARLY:
                return ("연간 반복")
            case RepeatType.SELECT:
                return ("지정 반복")
            default:
                return ("")
        }
    }

    function repeatInfo(): React.ReactNode {
        switch (repeatType) {
            case RepeatType.NONE:
                return (<></>)
            case RepeatType.ALWAYS:
                return (<></>)
            case RepeatType.WEEKLY:
                return (
                    <>
                        <p>반복 정보</p>
                        <WeeklyRepeatInfo />
                    </>
                )
            case RepeatType.MONTHLY:
                return (
                    <>
                        <p>반복 정보</p>
                        <MonthlyRepeatInfo />
                    </>
                )
            case RepeatType.YEARLY:
                return (
                    <>
                        <p>반복 정보</p>
                        <YearlyRepeatInfo />
                    </>
                )
            case RepeatType.SELECT:
                return (
                    <>
                        <p>반복 정보</p>
                        <SelectRepeatInfo />
                    </>
                )
            default:
                return (<></>)
        }
    }

    return (
        <>
            <p>
                반복 여부
                <span>
                    <input
                        type="checkbox"
                        checked={isGoalRepeat}
                        readOnly={true}
                    />
                </span>
            </p>
            <p>
                반복 종류:
                <span>
                    {repeatTypeName()}
                </span>
            </p>
            <div>{repeatInfo()}</div>
        </>
    )
}
