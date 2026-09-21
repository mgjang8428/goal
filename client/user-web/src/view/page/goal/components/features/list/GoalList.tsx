import type GetGoalListResponseDto from "@/model/goal/dto/response/getGoalListResponseDto"
import GoalListItem from "@/view/page/goal/components/features/list/GoalListItem"
import { useTranslation } from "react-i18next"

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
						<th>
							{t("goal_components:list.table_header.goal_title")}
						</th>
						<th>
							{t(
								"goal_components:list.table_header.goal_isActive"
							)}
						</th>
						<th>
							{t(
								"goal_components:list.table_header.goal_repeatType"
							)}
						</th>
						<th>
							{t(
								"goal_components:list.table_header.goal_update_button"
							)}
						</th>
						<th>
							{t(
								"goal_components:list.table_header.goal_delete_button"
							)}
						</th>
					</tr>
				</thead>
				<tbody>
					{goalList.length != 0 ? (
						goalList.map(
							({ goalId, title, isActive, repeatType }) => {
								return (
									<GoalListItem
										key={"goalListItem_" + goalId}
										goalId={goalId}
										title={title}
										isActive={isActive}
										repeatType={repeatType}
									/>
								)
							}
						)
					) : (
						<tr>
							<td colSpan={3}>
								{t(
									"goal_components:list.goal_create_request_message"
								)}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
