import type { Meta, StoryObj } from '@storybook/react-vite';

import GoalTitleContentSet from './GoalTitleContentSet';

const meta = {
  component: GoalTitleContentSet,
  tags: ['autodocs']
} satisfies Meta<typeof GoalTitleContentSet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};