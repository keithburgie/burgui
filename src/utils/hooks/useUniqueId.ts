import { useMemo } from "react";

export function useUniqueId(prefix: string) {
  return useMemo(
    () => `${prefix}-${Math.random().toString(36).slice(2, 11)}`,
    [prefix]
  );
}
