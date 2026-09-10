import type GetGoalListResponseDto from "@/model/goal/dto/response/getGoalListResponseDto";
import GoalListItem from "@/view/page/goal/main/components/GoalListItem";
import { useTranslation } from "react-i18next";

export interface GoalListProps {
    goalList: GetGoalListResponseDto[]
}

export default function GoalList({ goalList }: GoalListProps) {

    const { t } = useTranslation()

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{t("page.goal.main.goal_list.table_header.title")}</th>
                        <th>{t("page.goal.main.goal_list.table_header.update_btn")}</th>
                        <th>{t("page.goal.main.goal_list.table_header.delete_btn")}</th>
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
                                <td colSpan={3}>{t("page.goal.main.goal_list.empty_list_alert_message")}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
