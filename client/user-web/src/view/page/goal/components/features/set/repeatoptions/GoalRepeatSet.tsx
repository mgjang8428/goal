import RepeatType from "@/model/goal/const/repeatType"
import useGoalInfoStore from "@/store/goal/goalInfoStore"
import RepeatInfoSet from "@/view/page/goal/components/features/set/repeatoptions/GoalRepeatTypeSet"
import RepeatTypeSelectRadio from "@/view/page/goal/components/features/set/repeatoptions/RepeatTypeSelectRadio"
import { useTranslation } from "react-i18next"

export default function GoalRepeatSet() {
	const { t } = useTranslation()
	const { isGoalRepeat, setIsGoalRepeat, setRepeatType } = useGoalInfoStore()

	return (
		<>
			<label>
				{t("goal_components:set.repeatoptions.goalrepeatset.label.isRepeat")}
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
