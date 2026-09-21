import GoalTitleContentSet from "@/view/page/goal/components/features/set/GoalTitleContentSet"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
	component: GoalTitleContentSet,
	tags: ["autodocs"]
} satisfies Meta<typeof GoalTitleContentSet>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
