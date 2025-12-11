"use client";

import * as React from "react";

import Input from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Captions, Phone } from "lucide-react";
import { FormFieldWrapper } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { CreateUserSchemaType } from "../schemas/base.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserRoleOptions } from "@/hooks/use-enum";

export default function GeneralInfoSection({
  isLoading,
}: {
  isLoading?: boolean;
}) {
  const { array: roleOptions } = useUserRoleOptions();
  const form = useFormContext<CreateUserSchemaType>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "firstName",
          label: "Vardas",
          render: ({ field }) => (
            <Input {...field} placeholder="Vardas" disabled={isLoading} />
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "lastName",
          label: "Pavardė",
          render: ({ field }) => (
            <Input {...field} placeholder="Pavardė" disabled={isLoading} />
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "phoneNumber",
          label: "Telefono Nr.",
          render: ({ field }) => (
            <InputGroup>
              <InputGroupAddon>
                <Phone className="w-5 h-5" />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                placeholder="Telefono Nr."
                disabled={isLoading}
                value={field.value ?? ""}
              />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "duty",
          label: "Pareigybė",
          render: ({ field }) => (
            <InputGroup>
              <InputGroupAddon>
                <Captions className="w-5 h-5" />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                placeholder="Pareigybė"
                disabled={isLoading}
              />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "role",
          label: "Rolė",
          render: ({ field }) => (
            <Select
              {...field}
              onValueChange={field.onChange}
              value={field.value ?? ""}
              disabled={isLoading}
            >
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Pasirinkite rolę" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions?.map((role) => (
                  <SelectItem value={role.value} key={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ),
        }}
      />
    </div>
  );
}
