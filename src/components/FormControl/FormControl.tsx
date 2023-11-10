import { forwardRef } from "react";
import { Box, BoxProps } from "components/Box";

export interface FormControlOptions {
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
}

export interface FormControlContext extends FormControlOptions {
  id: string;
  label: string;
}

export interface FormControlProps
  extends FormControlContext,
    Omit<BoxProps, "id"> {
  error?: string;
}

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  ({ children, id, label, error, ...rest }, ref) => {
    return (
      <Box ref={ref} {...rest}>
        <label htmlFor={id}>{label}</label>
        {children}
        {error && (
          <span role="alert" aria-live="assertive" className="error">
            {error}
          </span>
        )}
      </Box>
    );
  }
);
