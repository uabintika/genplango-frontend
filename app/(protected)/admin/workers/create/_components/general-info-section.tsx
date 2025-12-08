"use client";

import { useGenderOptions, useWorkerStatusOptions } from "@/hooks/use-enum";
import useSWR from "swr";
import { API_ROUTES } from "@/routes/api";
import * as React from "react";

import Input from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { HouseIcon, MapPin, MapPinHouse, Phone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormFieldWrapper } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { CreateWorkerBaseSchemaType } from "../schemas/base.schema";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";

export default function GeneralInfoSection({
  isLoading,
}: {
  isLoading?: boolean;
}) {
  const form = useFormContext<CreateWorkerBaseSchemaType>();

  const { array: genders } = useGenderOptions();
  const { array: statuses } = useWorkerStatusOptions();

  const {
    data: municipalities,
    isLoading: loadingMunicipalities,
    isValidating: validatingMunicipalities,
  } = useSWR<Array<Municipality>>(API_ROUTES.MUNICIPALITIES.FOR_SELECT);

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
          name: "gender",
          label: "Lytis",
          render: ({ field }) => (
            <Select
              {...field}
              onValueChange={field.onChange}
              value={field.value ?? ""}
              disabled={isLoading}
            >
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Lytis" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((gender) => (
                  <SelectItem
                    value={gender.value.toString()}
                    key={gender.value.toString()}
                  >
                    {gender.label}
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
          name: "status",
          label: "Statusas",
          render: ({ field }) => (
            <Select
              {...field}
              onValueChange={field.onChange}
              value={field.value ?? ""}
              disabled={isLoading}
            >
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Statusas" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem
                    value={status.value.toString()}
                    key={status.value.toString()}
                  >
                    {status.label}
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
          name: "municipalities",
          label: "Savivaldybė",
          render: ({ field }) => (
            <MultiSelect
              values={field.value?.map(String)}
              onValuesChange={(values) =>
                field.onChange(values.map((v) => Number(v)))
              }
            >
              <MultiSelectTrigger
                disabled={
                  loadingMunicipalities || validatingMunicipalities || isLoading
                }
              >
                <MultiSelectValue
                  placeholder={
                    loadingMunicipalities || validatingMunicipalities
                      ? "Kraunamos savivaldybės..."
                      : "Pasirinkite savivaldybę"
                  }
                />
              </MultiSelectTrigger>

              <MultiSelectContent>
                <MultiSelectGroup>
                  {municipalities?.map((m) => (
                    <MultiSelectItem value={m.id.toString()} key={m.id}>
                      {m.name}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
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
              />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "address",
          label: "Adresas",
          render: ({ field }) => (
            <InputGroup>
              <InputGroupAddon>
                <HouseIcon className="w-5 h-5" />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                placeholder="Adresas"
                disabled={isLoading}
              />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "houseNr",
          label: "Namo Nr.",
          render: ({ field }) => (
            <InputGroup>
              <InputGroupAddon>
                <MapPinHouse className="w-5 h-5" />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                placeholder="Namo Nr."
                disabled={isLoading}
              />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "apartmentNr",
          label: "Buto Nr.",
          render: ({ field }) => (
            <InputGroup aria-disabled={isLoading}>
              <InputGroupAddon aria-disabled={isLoading}>
                <MapPinHouse className="w-5 h-5" />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                placeholder="Buto Nr."
                disabled={isLoading}
              />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "coordLat",
          label: "Koordinatės (platuma)",
          render: ({ field }) => (
            <InputGroup>
              <InputGroupAddon>
                <MapPin className="w-5 h-5" />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                placeholder="Koordinatės (platuma)"
                disabled={isLoading}
              />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "coordLng",
          label: "Koordinatės (ilguma)",
          render: ({ field }) => (
            <InputGroup>
              <InputGroupAddon>
                <MapPin className="w-5 h-5" />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                placeholder="Koordinatės (ilguma)"
                disabled={isLoading}
              />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "workStartDate",
          label: "Darbo pradžios data",
          render: ({ field }) => (
            <Input
              {...field}
              placeholder="Darbo pradžios data"
              disabled={isLoading}
            />
          ),
        }}
      />
    </div>
  );
}
