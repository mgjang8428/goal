import useGoalCreateViewModel from "@/viewmodel/goal/useGoalCreateViewModel"
import type { ChangeEvent } from "react"
import { useTranslation } from "react-i18next"

export default function GoalCreatePage() {

  const { t } = useTranslation()

  const {
    title, setTitle,
    content, setContent,
    goalCreate
  } = useGoalCreateViewModel()

  function submitHandler(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    goalCreate()
  }

  function titleInputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function contentInputChangeHandler(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <p>{t("page.goal.create.title_label")}</p>
        <input
          type="text"
          placeholder={t("page.goal.create.title_input_placeholder")}
          value={title}
          onChange={titleInputChangeHandler}
          minLength={1}
          maxLength={100}
          required
        />
        <p>{t("page.goal.create.content_label")}</p>
        <textarea
          placeholder={t("page.goal.create.content_input_placeholder")}
          value={content}
          onChange={contentInputChangeHandler}
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
