import { forwardRef, InputHTMLAttributes } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormFieldState,
  FormHelperText,
  FormLabel,
  useFormControl,
} from "components/FormControl";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }, ref) => {
    return <input ref={ref} {...rest} />;
  }
);

export interface ControlledInputProps extends InputProps {
  state: FormFieldState;
  errorText?: string;
  helperText?: string;
  label: string;
  // type: "text" | "password" | "email" | "number" | etc...
}
export const ControlledInput = ({
  errorText,
  helperText,
  id,
  label,
  state = {
    isDisabled: false,
    isInvalid: false,
    isReadOnly: false,
    isRequired: false,
  },
  ...inputProps
}: ControlledInputProps) => {
  const formControlContext = useFormControl();

  const showErrorMessage = state.isInvalid && !!errorText;
  const showHelperText = !showErrorMessage && !!helperText;

  return (
    <FormControl id={id} {...state}>
      <FormLabel>{label}</FormLabel>
      <Input
        disabled={formControlContext?.isDisabled}
        readOnly={formControlContext?.isReadOnly}
        required={formControlContext?.isRequired}
        aria-invalid={formControlContext?.isInvalid}
        {...inputProps}
      />
      {showErrorMessage && <FormErrorMessage>{errorText}</FormErrorMessage>}
      {showHelperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
