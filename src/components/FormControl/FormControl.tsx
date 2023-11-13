import { HTMLAttributes, forwardRef } from "react";
import { Box, BoxProps } from "components/Box";
import { FormControlProvider } from "./FormControlContext";
import { useFormControl } from "./useFormControl";

export interface FormFieldState {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
}

export interface FormControlProps extends FormFieldState, BoxProps {}

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  ({ id, isDisabled, isInvalid, isReadOnly, isRequired, ...rest }, ref) => {
    return (
      <FormControlProvider
        id={id}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
      >
        <Box ref={ref} className="form-control" {...rest} />
      </FormControlProvider>
    );
  }
);

export const FormErrorMessage = (props: HTMLAttributes<HTMLSpanElement>) => {
  const { isInvalid, id } = useFormControl() || {};
  return isInvalid ? (
    <span aria-describedby={id} aria-live="assertive" role="alert" {...props} />
  ) : null;
};

export const FormHelperText = (props: HTMLAttributes<HTMLSpanElement>) => {
  const { id } = useFormControl() || {};
  return <span aria-describedby={id} aria-live="polite" {...props} />;
};

export const FormLabel = (props: HTMLAttributes<HTMLLabelElement>) => {
  const { id } = useFormControl() || {};
  return <label htmlFor={id} {...props} />;
};
