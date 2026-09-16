import RepeatType from "@/model/goal/const/repeatType"
import useGoalInfoStore from "@/store/goal/goalInfoStore"
import type React from "react"

export default function RepeatTypeSelectRadio() {

    const {
        initRepeatInfoData,
        isGoalRepeat,
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
                            onChange={onChangeHandler}
                            defaultChecked
                        />
                        매일 반복
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="repeat-type"
                            value={RepeatType.WEEKLY}
                            onChange={onChangeHandler}
                        />
                        주간 반복
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="repeat-type"
                            value={RepeatType.MONTHLY}
                            onChange={onChangeHandler}
                        />
                        월간 반복
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="repeat-type"
                            value={RepeatType.YEARLY}
                            onChange={onChangeHandler}
                        />
                        연간 반복
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="repeat-type"
                            value={RepeatType.SELECT}
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