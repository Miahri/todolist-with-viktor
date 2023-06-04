import type { Meta, StoryObj } from '@storybook/react';
import {AddItemForm} from "../AddItemForm";
import {action} from '@storybook/addon-actions'


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem: {
      description: "Button was clicked inside form"
    }
  },
} as Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AddItemFormStory: Story = {
  args: {
    addItem: action('Button was clicked inside form')
  },
};
