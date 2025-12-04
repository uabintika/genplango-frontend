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
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { API_ROUTES } from "@/routes/api";
import { KinshipRelation } from "./general-info-section";
import { CreateServiceRecipientFormSchemaType } from "../schemas/base.schema";

export default function ContactItem({
  index,
  isLoading,
}: {
  index: number;
  isLoading?: boolean;
}) {
  const form = useFormContext<CreateServiceRecipientFormSchemaType>();

  const {
    data: kinshipRelations,
    isLoading: loadingKinships,
    isValidating: validatingKinships,
  } = useSWR<Array<KinshipRelation>>(API_ROUTES.KINSHIP_RELATIONS.FOR_SELECT, {
    revalidateOnMount: false,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <FormFieldWrapper
        control={form.control}
        formField={{
          name: `contacts.${index}.firstName`,
          label: "Kontaktinio asmens vardas",
          render: ({ field }) => (
            <Input {...field} placeholder="Vardas" disabled={isLoading} />
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: `contacts.${index}.lastName`,
          label: "Kontaktinio asmens pavardė",
          render: ({ field }) => (
            <Input {...field} placeholder="Pavardė" disabled={isLoading} />
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: `contacts.${index}.phoneNumber`,
          label: "Kontaktinio asmens tel. nr.",
          render: ({ field }) => (
            <Input {...field} placeholder="Tel. nr." disabled={isLoading} />
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: `contacts.${index}.kinshipRelationId`,
          label: "Ryšys su klientu",
          render: ({ field, fieldState }) => (
            <Select
              disabled={loadingKinships || validatingKinships || isLoading}
              onValueChange={field.onChange}
              value={field.value ?? ""}
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
          name: `contacts.${index}.isDefault`,
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
    </div>
  );
}
