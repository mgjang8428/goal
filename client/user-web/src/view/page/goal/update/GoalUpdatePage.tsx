import useGoalUpdateViewModel from "@/viewmodel/goal/useGoalUpdateViewModel"
import { useEffect, type ChangeEvent } from "react"
import { useParams } from "react-router"

export default function GoalUpdatePage() {
    const { goalId } = useParams<{ goalId: string }>()

    const {
        setGoalId,
        title, setTitle,
        content, setContent,
        getGoalDetail,
        updateGoal
    } = useGoalUpdateViewModel()

    useEffect(() => {
        setGoalId(parseInt(goalId as string, 10))
        getGoalDetail(parseInt(goalId as string, 10))
    }, [])

    function submitHandler(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        updateGoal()
    }

    function titleInputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function contentInputChangeHandler(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value)
    }

    return (
        <>
            <h1>GoalUpdatePage</h1>
            <form onSubmit={submitHandler}>
                <p>목표 번호: {goalId}</p>

                <p>제목</p>
                <input
                    type="text"
                    placeholder="제목 입력"
                    value={title}
                    onChange={titleInputChangeHandler}
                    minLength={1}
                    maxLength={100}
                    required
                />
                <p>내용</p>
                <textarea
                    placeholder="내용 입력"
                    value={content}
                    onChange={contentInputChangeHandler}
                    maxLength={3000}
                />
                <button
                    type="submit"
                    children="수정"
                />
            </form>
        </>
    )
}
