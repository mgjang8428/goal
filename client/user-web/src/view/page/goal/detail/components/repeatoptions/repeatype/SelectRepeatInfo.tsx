import useGoalInfoStore from "@/store/goal/goalInfoStore"

export default function SelectRepeatInfo() {

    const { selectRepeatInfo } = useGoalInfoStore()

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
                        selectRepeatInfo.map((date) => (
                            <tr
                                key={`yearRepeatSet_${date}`}
                                className="border"
                            >
                                <td className="border">{date}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
