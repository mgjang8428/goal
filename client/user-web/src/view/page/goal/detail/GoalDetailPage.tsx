import useGoalDetailViewModel from "@/viewmodel/goal/useGoalDetailViewModel"
import { useEffect } from "react"
import { useParams } from "react-router"

export default function GoalDetailPage() {

  const { goalId } = useParams<{ goalId: string }>()

  const {
    setGoalId,
    title,
    content,
    getGoalDetail,
    goUpdateGoalPage
  } = useGoalDetailViewModel()

  useEffect(() => {
    setGoalId(parseInt(goalId as string, 10))
    getGoalDetail(parseInt(goalId as string, 10))
  }, [])
  return (
    <>
      <h1>GoalDetailPage</h1>
      <button
        children="수정"
        onClick={goUpdateGoalPage}
      />
      <p>번호: <span>{goalId}</span></p>
      <p>제목</p>
      <p>{title}</p>
      <p>내용</p>
      <p>{content}</p>
    </>
  )
}
