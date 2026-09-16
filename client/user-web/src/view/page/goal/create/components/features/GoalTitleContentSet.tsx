import useGoalInfoStore from "@/store/goal/goalInfoStore"
import { useTranslation } from "react-i18next"

export default function GoalTitleContentSet() {

    const { t } = useTranslation()

    const {
        title,
        setTitle,
        content,
        setContent
    } = useGoalInfoStore()

    return (
        <>
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
        </>
    )
}
