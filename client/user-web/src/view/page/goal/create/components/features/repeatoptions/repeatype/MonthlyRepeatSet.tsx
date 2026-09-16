import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useState, type ChangeEvent } from "react"

export default function MonthlyRepeatSet() {

    const {
        monthRepeatInfo,
        setMonthRepeatInfoSetDate,
        setMonthRepeatInfoDeleteDate
    } = useGoalInfoStore()

    const [date, setDate] = useState(1)

    function dateOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        let value = Number(event.target.value)
        if (value <= 0) { value = 1 }
        if (value >= 31) { value = 31 }
        setDate(value)
    }

    return (
        <>
            <p>월간반복 일자선택</p>
            <input
                type="number"
                value={date}
                onChange={dateOnChangeHandler}
                min={1}
                max={31}
            />
            <button
                type="button"
                children="추가"
                onClick={() => {
                    setMonthRepeatInfoSetDate(date)
                }}
            />
            <p>추가된 반복일</p>
            <table className="border">
                <thead>
                    <tr className="border">
                        <td className="border">반복일</td>
                        <td className="border">삭제</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        monthRepeatInfo.map((date: number) => (
                            <tr key={`monthRepeatSet_${date}`} className="border">
                                <td className="border">{date}일</td>
                                <td className="border">
                                    <button
                                        type="button"
                                        children="X"
                                        onClick={() => { setMonthRepeatInfoDeleteDate(date) }}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
