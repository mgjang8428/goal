import useGoalCreateViewModel from "@/viewmodel/goal/useGoalCreateViewModel"
import type { ChangeEvent } from "react"
import { useTranslation } from "react-i18next"

export default function GoalCreatePage() {

  const { t } = useTranslation()

  const {
    title, setTitle,
    content, setContent,
    startDate, setStartDate,
    endDate, setEndDate,
    repeatType, setRepeatType,
    repeatInfo, setRepeatInfof,

    goalCreate
  } = useGoalCreateViewModel()

  function submitHandler(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    goalCreate()
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <p>{t("page.goal.create.title_label")}</p>
        <input
          type="text"
          placeholder={t("page.goal.create.title_input_placeholder")}
          value={title}
          onChange={(event) => { setTitle(event.target.value) }}
          minLength={1}
          maxLength={100}
          required
        />
        <p>{t("page.goal.create.content_label")}</p>
        <textarea
          placeholder={t("page.goal.create.content_input_placeholder")}
          value={content}
          onChange={(event) => { setContent(event.target.value) }}
          maxLength={3000}
        />
        <br />
        <button
          type="submit"
          children={t("page.goal.create.submit_button")}
        />
      </form>
    </>
  )
}
