import GoalActiveSet from "@/view/page/goal/create/components/features/repeatoptions/GoalActiveSet"
import GoalRepeatSet from "@/view/page/goal/create/components/features/repeatoptions/GoalRepeatSet"
import GoalStartEndDateSet from "@/view/page/goal/create/components/features/repeatoptions/GoalStartEndDateSet"

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
