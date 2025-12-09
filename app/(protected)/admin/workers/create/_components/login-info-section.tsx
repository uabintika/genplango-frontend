"use client";

import { FormFieldWrapper } from "@/components/ui/form";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Eye, EyeOff, Mail } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import * as React from "react";
import { useFieldPrefix } from "@/hooks/use-field-prefix";

type LoginInfoSectionProps<TForm extends FieldValues> = {
  form: UseFormReturn<TForm>;
  isLoading?: boolean;
  formNamePrefix: string;
};

export default function LoginInfoSection<TForm extends FieldValues>({
  form,
  isLoading,
  formNamePrefix,
}: LoginInfoSectionProps<TForm>) {
  const { prefixed } = useFieldPrefix<TForm>(formNamePrefix);

  const [passwordType, setPasswordType] = React.useState("password");

  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };

  return (
    <div className="gap-4">
      <FormFieldWrapper
        control={form.control}
        formField={{
          name: prefixed("workerEmail"),
          label: "El. Paštas",
          render: ({ field }) => (
            <InputGroup>
              <InputGroupAddon>
                <Mail className="w-5 h-5" />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                placeholder="El. Paštas"
                disabled={isLoading}
                autoComplete="workerEmail"
              />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: prefixed("workerPassword"),
          label: "Slaptažodis",
          render: ({ field }) => (
            <InputGroup>
              <InputGroupInput
                {...field}
                placeholder="Slaptažodis"
                disabled={isLoading}
                type={passwordType}
                autoComplete="new-password"
              />
              <InputGroupAddon
                className="cursor-pointer flex"
                align="inline-end"
                onClick={togglePasswordType}
              >
                {passwordType === "password" ? (
                  <Eye className="peer-focus:text-default-400" />
                ) : (
                  <EyeOff className="text-default-400" />
                )}
              </InputGroupAddon>
            </InputGroup>
          ),
        }}
      />
    </div>
  );
}
