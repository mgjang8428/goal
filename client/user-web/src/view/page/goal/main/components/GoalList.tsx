import type GetGoalListResponseDto from "@/model/goal/dto/response/getGoalListResponseDto";
import GoalListItem from "@/view/page/goal/main/components/GoalListItem";

export interface GoalListProps {
    goalList: GetGoalListResponseDto[]
}

export default function GoalList({ goalList }: GoalListProps) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        goalList.length != 0 ? (
                            goalList.map(({ goalId, title }) => {
                                return <GoalListItem
                                    key={"goalListItem_" + goalId}
                                    goalId={goalId}
                                    title={title}
                                />
                            })
                        ) : (
                            <tr>
                                <td colSpan={3}>목표를 생성해주세요.</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
