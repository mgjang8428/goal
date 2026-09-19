import GoalTitleContentSet from "@/view/page/goal/components/features/GoalTitleContentSet"
import useGoalCreateViewModel from "@/viewmodel/goal/useGoalCreateViewModel"
import { useTranslation } from "react-i18next"
import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useEffect } from "react"
import GoalRepeatOptionsSet from "@/view/page/goal/components/features/GoalRepeatOptionsSet"

export default function GoalCreatePage() {

  const { t } = useTranslation()

  const {
    initAllStoreData
  } = useGoalInfoStore()

  const {
    goalCreate
  } = useGoalCreateViewModel()

  function submitHandler(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    goalCreate()
  }

  useEffect(() => {
    return () => {
      initAllStoreData()
    }
  }, [initAllStoreData]
  )

  return (
    <>
      <form onSubmit={submitHandler}>
        <GoalTitleContentSet />
        <br />
        <GoalRepeatOptionsSet />
        <br />
        <button
          type="submit"
        >
          {t("page.goal.create.submit_button")}
        </button>
      </form>
    </>
  )
}
