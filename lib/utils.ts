import { clsx, type ClassValue } from "clsx";
import { FieldPath, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function withoutKeys<T extends FieldValues>(
  object: object,
  except: FieldPath<T>[]
): FieldPath<T>[] {
  return Object.keys(object).filter(
    (key): key is FieldPath<T> => !except.includes(key as FieldPath<T>)
  );
}
