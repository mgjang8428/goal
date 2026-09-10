import useGoalCreateViewModel from "@/viewmodel/goal/useGoalCreateViewModel"
import type { ChangeEvent } from "react"

export default function GoalCreatePage() {
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
        <br />
        <button
          type="submit"
          children={"생성"}
        />
      </form>
    </>
  )
}
