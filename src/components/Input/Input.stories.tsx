import type { Meta, StoryObj } from "@storybook/react";

import { ControlledInput } from "./Input";

// Update imports or delete if not exporting types
// import { INPUT_VARIANTS } from './Input.types';

const meta = {
  title: "Components/Input",
  component: ControlledInput,
  tags: ["autodocs"],
  argTypes: {
    // variant: {
    //     options: [undefined, ...INPUT_VARIANTS],
    //     control: { type: 'radio' }
    // }
  },
} satisfies Meta<typeof ControlledInput>;

export default meta;
type Story = StoryObj<typeof ControlledInput>;

const tailwindStyles =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

const baseArgs = {
  className: tailwindStyles,
  type: "text",
  placeholder: "Username",
  label: "Username",
  errorText: "This is error text.",
  helperText: "This is helper text.",
  state: {
    isInvalid: false,
  },
};

export const Playground: Story = {
  args: {
    ...baseArgs,
  },
};
