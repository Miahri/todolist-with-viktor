import type { Meta, StoryObj } from '@storybook/react';
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} as Meta<typeof AppWithRedux>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AppWithReduxStory: Story = {};
