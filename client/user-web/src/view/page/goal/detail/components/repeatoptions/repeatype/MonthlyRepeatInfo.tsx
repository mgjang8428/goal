import useGoalInfoStore from "@/store/goal/goalInfoStore"

export default function MonthlyRepeatInfo() {

    const { monthRepeatInfo } = useGoalInfoStore()

    return (
        <>
            <table className="border">
                <thead>
                    <tr className="border">
                        <td className="border">반복일</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        monthRepeatInfo.map((date: number) => (
                            <tr key={`monthRepeatSet_${date}`} className="border">
                                <td className="border">{date}일</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
