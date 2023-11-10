import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...rest }, ref) => {
    return <input ref={ref} {...rest} aria-invalid={error ? true : false} />;
  }
);
