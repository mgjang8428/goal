import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useEffect } from "react"

export default function GoalStartEndDateSet() {

    const {
        startDate,
        setStartDate,
        isEndDate,
        setIsEndDate,
        endDate,
        setEndDate
    } = useGoalInfoStore()

    const now = new Date()
    const nowYear = now.getFullYear()
    const nowMonth = String(now.getMonth() + 1).padStart(2, '0')
    const nowDate = String(now.getDate()).padStart(2, '0')
    const nowFormat = `${nowYear}-${nowMonth}-${nowDate}`

    useEffect(() => {
        if (startDate == "") {
            setStartDate(nowFormat)
        }
        if (isEndDate == false) {
            setEndDate("")
        }
    }, [
        startDate,
        nowFormat,
        setStartDate,
        isEndDate,
        setEndDate
    ])

    return (
        <>
            <label>
                시작일:
                <input
                    type="date"
                    value={startDate}
                    onChange={(event) => { setStartDate(event.target.value) }}
                    min={startDate}
                />
            </label>
            <br />
            <input
                type="checkbox"
                checked={isEndDate}
                onChange={(event) => { setIsEndDate(event.target.checked) }}
            />
            <label>
                끝일:
                <input
                    type="date"
                    value={isEndDate ? endDate : ""}
                    onChange={(event) => { setEndDate(event.target.value) }}
                    readOnly={!isEndDate}
                    min={nowFormat}
                />
            </label>
        </>
    )
}
