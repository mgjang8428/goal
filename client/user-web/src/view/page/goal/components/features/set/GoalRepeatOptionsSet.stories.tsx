import GoalRepeatOptionsSet from "@/view/page/goal/components/features/set/GoalRepeatOptionsSet"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
	component: GoalRepeatOptionsSet,
	tags: ["autodocs"]
} satisfies Meta<typeof GoalRepeatOptionsSet>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
