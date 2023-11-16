import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";

interface BaseProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

export interface BoxProps extends BaseProps {}

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return <div ref={ref} {...props} />;
});
