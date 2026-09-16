import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useState } from "react";

export default function YearlyRepeatSet() {

    const {
        yearRepeatInfo,
        setYearRepeatInfoSetDate,
        setYearRepeatInfoDeleteDate,
    } = useGoalInfoStore()

    // const monthType = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    const monthType = Array.from({ length: 12 }, (_, i) =>
        String(i + 1).padStart(2, "0")
    );
    const dateType = Array.from({ length: 31 }, (_, i) =>
        String(i + 1).padStart(2, "0")
    );

    const [monthValue, setMonthValue] = useState("01")
    const [dateValue, setDateValue] = useState("01")

    return (
        <>
            <p>연간반복 날짜선택</p>
            <select
                className="border"
                value={monthValue}
                onChange={(event) => { setMonthValue(event.target.value) }}
            >
                {
                    monthType.map((month) => (
                        <option
                            key={`month_select_${month}`}
                            value={month}
                            children={`${month}월`}
                        />
                    ))
                }
            </select>
            <select
                className="border"
                value={dateValue}
                onChange={(event) => { setDateValue(event.target.value) }}
            >
                {
                    dateType.map((date) => (
                        <option
                            key={`date_select_${date}`}
                            value={date}
                            children={`${date}일`}
                        />
                    ))
                }
            </select>
            <button
                type="button"
                children="추가"
                onClick={() => {
                    setYearRepeatInfoSetDate(`${monthValue}월${dateValue}일`)
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
                        yearRepeatInfo.map((date) => (
                            <tr
                                key={`yearRepeatSet_${date}`}
                                className="border"
                            >
                                <td className="border">{date}</td>
                                <td className="border">
                                    <button
                                        className="border"
                                        type="button"
                                        children="X"
                                        onClick={() => { setYearRepeatInfoDeleteDate(date) }}
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
