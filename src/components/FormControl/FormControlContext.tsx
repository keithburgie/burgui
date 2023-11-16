import { createContext } from "react";
import { useUniqueId } from "../../utils/hooks/useUniqueId";
import { FormControlProps } from "./FormControl";

export const FormControlContext = createContext<FormControlProps | null>(null);

export const FormControlProvider = ({
  children,
  id,
  isDisabled,
  isInvalid,
  isReadOnly,
  isRequired,
}: FormControlProps) => {
  const uniqueId = useUniqueId("form-control");

  return (
    <FormControlContext.Provider
      value={{
        id: id || uniqueId,
        isDisabled,
        isInvalid,
        isReadOnly,
        isRequired,
      }}
    >
      {children}
    </FormControlContext.Provider>
  );
};
