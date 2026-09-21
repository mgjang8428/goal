import RepeatType from "@/model/goal/const/repeatType"
import useGoalInfoStore from "@/store/goal/goalInfoStore"
import type React from "react"
import { useTranslation } from "react-i18next"

export default function RepeatTypeSelectRadio() {

	const { t } = useTranslation()

	const { initRepeatInfoData, isGoalRepeat, repeatType, setRepeatType } =
		useGoalInfoStore()

	function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		setRepeatType(event.target.value)
		initRepeatInfoData()
	}

	if (isGoalRepeat) {
		return (
			<div>
				{/* 반복 종류 라디오 버튼 */}
				<fieldset>
					<legend>{t("goal_components:set.repeatoptions.repeattypeselectradio.legend")}</legend>
					<label>
						<input
							type="radio"
							name="repeat-type"
							value={RepeatType.ALWAYS}
							checked={
								repeatType == RepeatType.ALWAYS ? true : false
							}
							onChange={onChangeHandler}
						/>
						{t("goal_components:set.repeatoptions.repeattypeselectradio.always")}
					</label>
					<label>
						<input
							type="radio"
							name="repeat-type"
							value={RepeatType.WEEKLY}
							checked={
								repeatType == RepeatType.WEEKLY ? true : false
							}
							onChange={onChangeHandler}
						/>
						{t("goal_components:set.repeatoptions.repeattypeselectradio.weekly")}
					</label>
					<label>
						<input
							type="radio"
							name="repeat-type"
							value={RepeatType.MONTHLY}
							checked={
								repeatType == RepeatType.MONTHLY ? true : false
							}
							onChange={onChangeHandler}
						/>
						{t("goal_components:set.repeatoptions.repeattypeselectradio.monthly")}
					</label>
					<label>
						<input
							type="radio"
							name="repeat-type"
							value={RepeatType.YEARLY}
							checked={
								repeatType == RepeatType.YEARLY ? true : false
							}
							onChange={onChangeHandler}
						/>
						{t("goal_components:set.repeatoptions.repeattypeselectradio.yearly")}
					</label>
					<label>
						<input
							type="radio"
							name="repeat-type"
							value={RepeatType.SELECT}
							checked={
								repeatType == RepeatType.SELECT ? true : false
							}
							onChange={onChangeHandler}
						/>
						{t("goal_components:set.repeatoptions.repeattypeselectradio.select")}
					</label>
				</fieldset>
			</div>
		)
	} else {
		return <></>
	}
}
