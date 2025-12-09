"use client";

import { FormFieldWrapper } from "@/components/ui/form";
import Input from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldValues, UseFormReturn } from "react-hook-form";
import useSWR from "swr";
import { API_ROUTES } from "@/routes/api";
import { KinshipRelation } from "./general-info-section";
import { useFieldPrefix } from "@/hooks/use-field-prefix";

type ContactFormItemProps<TForm extends FieldValues> = {
  form: UseFormReturn<TForm>;
  namePrefix?: string;
  isLoading?: boolean;
};

export default function ContactFormItem<TForm extends FieldValues>({
  form,
  namePrefix,
  isLoading,
}: ContactFormItemProps<TForm>) {
  const { prefixed } = useFieldPrefix<TForm>(namePrefix);

  const {
    data: kinshipRelations,
    isLoading: loadingKinships,
    isValidating: validatingKinships,
  } = useSWR<Array<KinshipRelation>>(
    API_ROUTES.KINSHIP_RELATIONS.FOR_SELECT,
    {}
  );

  return (
    <>
      <FormFieldWrapper
        control={form.control}
        formField={{
          name: prefixed("firstName"),
          label: "Kontaktinio asmens vardas",
          render: ({ field }) => (
            <Input {...field} placeholder="Vardas" disabled={isLoading} />
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: prefixed("lastName"),
          label: "Kontaktinio asmens pavardė",
          render: ({ field }) => (
            <Input {...field} placeholder="Pavardė" disabled={isLoading} />
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: prefixed("phoneNumber"),
          label: "Kontaktinio asmens tel. nr.",
          render: ({ field }) => (
            <Input {...field} placeholder="Tel. nr." disabled={isLoading} />
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: prefixed("kinshipRelationId"),
          label: "Ryšys su klientu",
          render: ({ field, fieldState }) => (
            <Select
              disabled={loadingKinships || validatingKinships || isLoading}
              onValueChange={field.onChange}
              value={String(field.value ?? "")}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder="Pasirinkite ryšį" />
              </SelectTrigger>
              <SelectContent>
                {kinshipRelations?.map((k) => (
                  <SelectItem value={k.id.toString()} key={k.id}>
                    {k.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: prefixed("isDefault"),
          label: "Numatytas kontaktas",
          render: ({ field }) => (
            <Checkbox
              defaultChecked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLoading}
            />
          ),
        }}
      />
    </>
  );
}
