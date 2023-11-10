import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "./Box";

// Update imports or delete if not exporting types
// import { BOX_VARIANTS } from './Box.types';

const meta = {
  title: "Components/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    // variant: {
    //     options: [undefined, ...BOX_VARIANTS],
    //     control: { type: 'radio' }
    // }
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof Box>;

const baseArgs = {
  children: "Box",
};

export const Playground: Story = {
  args: {
    ...baseArgs,
  },
};
