import useGoalInfoStore from "@/store/goal/goalInfoStore"

export default function GoalTitleContentInfo() {
    const {
        title,
        content
    } = useGoalInfoStore()
    return (
        <>
            <p>제목</p>
            <p>{title}</p>
            <p>내용</p>
            <p>{content}</p>
        </>
    )
}
