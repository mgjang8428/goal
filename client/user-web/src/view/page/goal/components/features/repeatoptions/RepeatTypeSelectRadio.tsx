import RepeatType from "@/model/goal/const/repeatType"
import useGoalInfoStore from "@/store/goal/goalInfoStore"
import type React from "react"

export default function RepeatTypeSelectRadio() {

    const {
        initRepeatInfoData,
        isGoalRepeat,
        repeatType,
        setRepeatType
    } = useGoalInfoStore()

    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setRepeatType(event.target.value)
        initRepeatInfoData()
    }

    if (isGoalRepeat) {
        return (
            <div>
                {/* 반복 종류 라디오 버튼 */}
                <fieldset>
                    <legend>반복 종류</legend>
                    <label>
                        <input
                            type="radio"
                            name="repeat-type"
                            value={RepeatType.ALWAYS}
                            checked={repeatType == RepeatType.ALWAYS ? true : false}
                            onChange={onChangeHandler}
                        />
                        매일 반복
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="repeat-type"
                            value={RepeatType.WEEKLY}
                            checked={repeatType == RepeatType.WEEKLY ? true : false}
                            onChange={onChangeHandler}
                        />
                        주간 반복
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="repeat-type"
                            value={RepeatType.MONTHLY}
                            checked={repeatType == RepeatType.MONTHLY ? true : false}
                            onChange={onChangeHandler}
                        />
                        월간 반복
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="repeat-type"
                            value={RepeatType.YEARLY}
                            checked={repeatType == RepeatType.YEARLY ? true : false}
                            onChange={onChangeHandler}
                        />
                        연간 반복
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="repeat-type"
                            value={RepeatType.SELECT}
                            checked={repeatType == RepeatType.SELECT ? true : false}
                            onChange={onChangeHandler}
                        />
                        지정 반복
                    </label>
                </fieldset>
            </div>
        )
    } else {
        return (<></>)
    }
}