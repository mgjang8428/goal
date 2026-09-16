import useGoalInfoStore, { type WeekRepeatSetCheck } from "@/store/goal/goalInfoStore"

export default function WeeklyRepeatSet() {

    const {
        weekRepeatInfo,
        setWeekRepeatInfoSetDayValue
    } = useGoalInfoStore()

    function onChangeHandler(
        day: keyof WeekRepeatSetCheck,
        value: boolean
    ) {
        setWeekRepeatInfoSetDayValue(day, value)
        console.log(weekRepeatInfo)
    }

    return (
        <>
            <p>주간반복 요일선택</p>
            <label>
                월
                <input
                    type="checkbox"
                    checked={weekRepeatInfo.MON}
                    onChange={() => {
                        onChangeHandler('MON', !weekRepeatInfo.MON)
                    }}
                />
            </label>
            <label>
                화
                <input
                    type="checkbox"
                    checked={weekRepeatInfo.TUE}
                    onChange={() => {
                        onChangeHandler('TUE', !weekRepeatInfo.TUE)
                    }}
                />
            </label>
            <label>
                수
                <input
                    type="checkbox"
                    checked={weekRepeatInfo.WED}
                    onChange={() => {
                        onChangeHandler('WED', !weekRepeatInfo.WED)
                    }}
                />
            </label>
            <label>
                목
                <input
                    type="checkbox"
                    checked={weekRepeatInfo.THU}
                    onChange={() => {
                        onChangeHandler('THU', !weekRepeatInfo.THU)
                    }}
                />
            </label>
            <label>
                금
                <input
                    type="checkbox"
                    checked={weekRepeatInfo.FRI}
                    onChange={() => {
                        onChangeHandler('FRI', !weekRepeatInfo.FRI)
                    }}
                />
            </label>
            <label>
                토
                <input
                    type="checkbox"
                    checked={weekRepeatInfo.SAT}
                    onChange={() => {
                        onChangeHandler('SAT', !weekRepeatInfo.SAT)
                    }}
                />
            </label>
            <label>
                일
                <input
                    type="checkbox"
                    checked={weekRepeatInfo.SUN}
                    onChange={() => {
                        onChangeHandler('SUN', !weekRepeatInfo.SUN)
                    }}
                />
            </label>
        </>
    )
}
