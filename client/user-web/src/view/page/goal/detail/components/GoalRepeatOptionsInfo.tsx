import GoalActiveInfo from "@/view/page/goal/detail/components/repeatoptions/GoalActiveInfo";
import GoalRepeatInfo from "@/view/page/goal/detail/components/repeatoptions/GoalRepeatInfo";
import GoalStartEndDateInfo from "@/view/page/goal/detail/components/repeatoptions/GoalStartEndDateInfo";

export default function GoalRepeatOptionsInfo() {
    return (
        <>
            <GoalActiveInfo />
            <GoalStartEndDateInfo />
            <GoalRepeatInfo />
        </>
    )
}
