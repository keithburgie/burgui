import type { Meta, StoryObj } from "@storybook/react";

import { FormControl } from "./FormControl";

// Update imports or delete if not exporting types
// import { FORM_CONTROL_VARIANTS } from './FormControl.types';

const meta = {
  title: "Components/FormControl",
  component: FormControl,
  tags: ["autodocs"],
  argTypes: {
    // variant: {
    //     options: [undefined, ...FORM_CONTROL_VARIANTS],
    //     control: { type: 'radio' }
    // }
  },
} satisfies Meta<typeof FormControl>;

export default meta;
type Story = StoryObj<typeof FormControl>;

// const baseArgs = {
//   children: FormControl,
// };

export const Playground: Story = {
  // args: {
  //   ...baseArgs,
  // },
};
