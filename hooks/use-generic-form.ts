import z, { ZodObject, type output } from "zod";
import type {
  Mode,
  UseGenericFormProps,
  UseGenericFormReturn,
} from "@/types/use-generic-form";

import api from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm, type Resolver } from "react-hook-form";
import useApi from "./use-api";
import useSWR from "swr";
import * as React from "react";
import { toast } from "sonner";

function getModes(mode: Mode) {
  return {
    isCreate: mode === "Create",
    isUpdate: mode === "Update",
  };
}

export default function useGenericForm<
  TSchema extends ZodObject<{ [key: string]: z.ZodType }>,
  TReturnModel = output<TSchema>
>({
  mode,
  schema,
  mutateUrl,
  fetchModelUrl,
  onSuccess,
  onError,
  useFormOptions,
}: UseGenericFormProps<TSchema>): UseGenericFormReturn<TSchema, TReturnModel> {
  type TOutput = output<TSchema>;

  const modes = React.useMemo(() => getModes(mode), [mode]);

  if (modes.isUpdate && typeof fetchModelUrl === "undefined") {
    throw new Error("'fetchModelUrl' is missing in hook properties");
  }

  // initialize fetchers, memoize functions
  const create = React.useCallback(
    (url: string, body?: TOutput) => api.post(url, body),
    []
  );

  const update = React.useCallback(
    (url: string, body?: TOutput) => api.put(url, body),
    []
  );

  const fetchModel = React.useCallback(
    async (url: string): Promise<TReturnModel> =>
      api.get(url).then((res) => res.data),
    []
  );

  // if editing fetch record
  const {
    data: fetchedModel,
    isLoading: isFetchingModel,
    error: fetchError,
    mutate: mutateFetchedModel,
    isValidating,
  } = useSWR<TReturnModel>(
    modes.isUpdate ? fetchModelUrl : null,
    modes.isUpdate ? fetchModel : null
  );

  // here should go types of schema in both Input and Output
  const form = useForm<TOutput, unknown, TOutput>({
    resolver: zodResolver(schema) as unknown as Resolver<TOutput>,
    defaultValues: schema.parse({}) as DefaultValues<TOutput>,
    ...useFormOptions,
  });

  React.useEffect(() => {
    if (!fetchedModel || isValidating || isFetchingModel) return;

    form.reset(schema.parse(fetchedModel));
  }, [fetchedModel, isValidating, isFetchingModel]);

  // model create, edit hook
  const {
    execute,
    isLoading: isMutating,
    data: mutatedModel,
    error: mutationError,
  } = useApi<TReturnModel, TOutput>(
    mutateUrl,
    modes.isUpdate ? update : create
  );

  const isLoading = isFetchingModel || isMutating || isValidating;

  // handle toast for api feedback useEffect #1
  React.useEffect(() => {
    if (!fetchError && !mutationError) return;

    if (onError) {
      onError();
      return;
    }

    if (fetchError) {
      toast.error("Nepavyko rasti įrašo. Pabandykite dar kartą.");
    }

    if (mutationError) {
      toast.error("Nepavyko išsaugoti įrašo. Pabandykite dar kartą.");
    }
  }, [fetchError, mutationError, onError]);

  const prevModel = React.useRef<TReturnModel | null>(null);

  // handle form reset logic useEffect #2
  React.useEffect(() => {
    if (!mutatedModel) return;

    if (prevModel.current !== mutatedModel) {
      prevModel.current = mutatedModel;

      if (modes.isCreate) form.reset();
      onSuccess?.();
    }
  }, [mutatedModel, modes, onSuccess, form]);

  return {
    form,
    createdModel: mutatedModel,
    fetchedModel,
    isLoading,
    mutationError,
    submitForm: execute,
    mutateFetchedModel,
  };
}
