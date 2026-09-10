import useGoalDetailViewModel from "@/viewmodel/goal/useGoalDetailViewModel"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router"

export default function GoalDetailPage() {

  const { t } = useTranslation()

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
        children={t("page.goal.detail.change_button")}
        onClick={goUpdateGoalPage}
      />
      <p>{t("page.goal.detail.number_label")}: <span>{goalId}</span></p>
      <p>{t("page.goal.detail.title_label")}</p>
      <p>{title}</p>
      <p>{t("page.goal.detail.content_label")}</p>
      <p>{content}</p>
    </>
  )
}
