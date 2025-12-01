import type { AxiosError } from "axios";
import type { UseFormProps, UseFormReturn } from "react-hook-form";
import type { output, z, ZodObject } from "zod";

export interface UseGenericFormReturn<
  TSchema extends ZodObject<{ [key: string]: z.ZodType }>,
  TModel = output<TSchema> // returned by API
> {
  form: UseFormReturn<output<TSchema>, unknown, output<TSchema>>;
  createdModel: TModel | null;
  fetchedModel?: TModel;
  isLoading: boolean;
  mutationError: AxiosError | string | null;
  submitForm: (body?: output<TSchema>) => Promise<TModel | null>;
}

export type Mode = "Create" | "Update";

export interface UseGenericFormProps<
  TSchema extends ZodObject<{ [key: string]: z.ZodType }>
> {
  mode: Mode;
  schema: TSchema;
  mutateUrl: string;
  fetchModelUrl?: string;
  onSuccess?: () => void;
  onError?: () => void;
  useFormOptions?: UseFormProps<output<TSchema>, unknown, output<TSchema>>;
}
