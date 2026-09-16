import RepeatType from "@/model/goal/const/repeatType"
import useGoalInfoStore from "@/store/goal/goalInfoStore"
import RepeatInfoSet from "@/view/page/goal/components/features/repeatoptions/GoalRepeatTypeSet"
import RepeatTypeSelectRadio from "@/view/page/goal/components/features/repeatoptions/RepeatTypeSelectRadio"

export default function GoalRepeatSet() {

    const {
        isGoalRepeat,
        setIsGoalRepeat,
        setRepeatType,
    } = useGoalInfoStore()

    return (
        <>
            <label>반복 설정:
                <input
                    type="checkbox"
                    checked={isGoalRepeat}
                    onChange={() => {
                        setIsGoalRepeat(!isGoalRepeat)
                        setRepeatType(
                            isGoalRepeat ? RepeatType.NONE : RepeatType.ALWAYS
                        )
                    }}
                />
            </label>
            <RepeatTypeSelectRadio />
            <RepeatInfoSet />
        </>
    )
}
