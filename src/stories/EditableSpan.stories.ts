import type { Meta, StoryObj } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {EditableSpan} from "../EditableSpan";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  argTypes: {
    onChange: {
      description: "Title was changed"
    }
  },
} as Meta<typeof EditableSpan>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EditableSpanStory: Story = {
  args: {
    title: 'Editable Span',
    onChange: action('Button was clicked inside form'),
  },
};
