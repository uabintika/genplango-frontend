import { FieldPath, FieldValues } from "react-hook-form";
import { useCallback } from "react";

export function useFieldPrefix<TForm extends FieldValues>(prefix?: string) {
  const prefixed = useCallback(
    (suffix: string): FieldPath<TForm> => {
      if (prefix) {
        return `${prefix}.${suffix}` as FieldPath<TForm>;
      }
      return suffix as FieldPath<TForm>;
    },
    [prefix]
  );

  return { prefixed };
}
