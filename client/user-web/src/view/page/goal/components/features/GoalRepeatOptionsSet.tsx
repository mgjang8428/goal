import GoalActiveSet from "@/view/page/goal/components/features/repeatoptions/GoalActiveSet"
import GoalRepeatSet from "@/view/page/goal/components/features/repeatoptions/GoalRepeatSet"
import GoalStartEndDateSet from "@/view/page/goal/components/features/repeatoptions/GoalStartEndDateSet"

export default function GoalRepeatOptions() {

    return (
        <>
            <GoalActiveSet />
            <br />
            <GoalStartEndDateSet />
            <br />
            <GoalRepeatSet />
        </>
    )
}
