"use client";

import { FormFieldWrapper } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useNotesOptions } from "@/hooks/use-enum";

type NoteFormItemProps = {
  form: UseFormReturn;
  isLoading?: boolean;
};

export default function NoteFormItem({ form, isLoading }: NoteFormItemProps) {
  const { array: noteTypes } = useNotesOptions();

  return (
    <>
      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "type",
          label: "Užrašo tipas",
          render: ({ field, fieldState }) => (
            <Select
              disabled={isLoading}
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder="Pasirinkite užrašo tipą" />
              </SelectTrigger>
              <SelectContent>
                {noteTypes.map((note) => {
                  return (
                    <SelectItem value={note.value} key={note.value}>
                      {note.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "description",
          label: "Aprašymas",
          render: ({ field }) => (
            <Textarea
              {...field}
              placeholder="Užrašo aprašymas"
              disabled={isLoading}
              rows={15}
            />
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "useForAi",
          label: "Leisti dirbtiniam intelektui naudoti užrašą?",
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
