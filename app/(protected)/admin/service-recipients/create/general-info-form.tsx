"use client";

import { useGenderOptions } from "@/hooks/use-enum";
import useSWR from "swr";
import { API_ROUTES } from "@/routes/api";
import * as React from "react";

import Input from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Cake, MapPin, MapPinHouse } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useFormWizard,
  useRegisterWizardStep,
} from "@/components/form-wizard/context";
import useGenericForm from "@/hooks/use-generic-form";
import { FormFieldWrapper } from "@/components/ui/form";
import { MasterCreateSRFormSchemaType } from "./page";

type Municipality = {
  id: number;
  name: string;
};

type KinshipRelation = {
  id: number;
  name: string;
};

type RelativeServiceRecipient = {
  id: number;
  fullName: string;
};

export default function GeneralInfoForm() {
  const genders = useGenderOptions();
  const { form } = useFormWizard<MasterCreateSRFormSchemaType>();
  const selectedMunicipality = form.watch("generalInfo.municipalityId");
  const relativeServiceRecipientId = form.watch(
    "generalInfo.relativeServiceRecipientId"
  );

  useRegisterWizardStep({
    id: "generalInfo",
    validate: async () => await form.trigger(),
    getData: () => form.getValues("generalInfo"),
  });

  const {
    data: municipalities,
    isLoading: loadingMunicipalities,
    isValidating: validatingMunicipalities,
  } = useSWR<Array<Municipality>>(API_ROUTES.MUNICIPALITIES.ALLOWED);

  const {
    data: kinshipRelations,
    isLoading: loadingKinships,
    isValidating: validatingKinships,
  } = useSWR<Array<KinshipRelation>>(API_ROUTES.KINSHIP_RELATIONS.ALLOWED);

  const {
    data: relativeServiceRecipients,
    isLoading: loadingRelativeSRs,
    isValidating: validatingRelativeSRs,
  } = useSWR<Array<RelativeServiceRecipient>>(
    selectedMunicipality
      ? `${API_ROUTES.SERVICE_RECIPIENTS.RELATIVES}?municipalityId=${parseInt(
          selectedMunicipality
        )}`
      : API_ROUTES.SERVICE_RECIPIENTS.RELATIVES
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "generalInfo.firstName",
          label: "Vardas",
          render: ({ field }) => <Input {...field} placeholder="Vardas" />,
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "generalInfo.lastName",
          label: "Pavardė",
          render: ({ field }) => <Input {...field} placeholder="Pavardė" />,
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "generalInfo.gender",
          label: "Lytis",
          render: ({ field }) => (
            <Select
              {...field}
              onValueChange={field.onChange}
              value={field.value ?? ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Lytis" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((gender) => (
                  <SelectItem value={gender.value} key={gender.value}>
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
          name: "generalInfo.birthDate",
          label: "Gimimo data",
          render: ({ field }) => (
            <InputGroup>
              <InputGroupAddon>
                <Cake className="w-5 h-5" />
              </InputGroupAddon>
              <InputGroupInput {...field} placeholder="Gimimo data" />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "generalInfo.municipalityId",
          label: "Savivaldybė",
          render: ({ field, fieldState }) => (
            <Select
              {...field}
              onValueChange={field.onChange}
              value={field.value ?? ""}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder="Pasirinkite savivaldybę" />
              </SelectTrigger>
              <SelectContent>
                {municipalities?.map((municipality) => (
                  <SelectItem
                    value={municipality.id.toString()}
                    key={municipality.id}
                  >
                    {municipality.name}
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
          name: "generalInfo.address",
          label: "Adresas",
          render: ({ field }) => <Input {...field} placeholder="Adresas" />,
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "generalInfo.houseNr",
          label: "Namo Nr.",
          render: ({ field }) => (
            <InputGroup>
              <InputGroupAddon>
                <MapPinHouse className="w-5 h-5" />
              </InputGroupAddon>
              <InputGroupInput {...field} placeholder="Namo Nr." />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "generalInfo.appartmentNr",
          label: "Buto Nr.",
          render: ({ field }) => (
            <InputGroup>
              <InputGroupAddon>
                <MapPinHouse className="w-5 h-5" />
              </InputGroupAddon>
              <InputGroupInput {...field} placeholder="Buto Nr." />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "generalInfo.coordLat",
          label: "Koordinatės (platuma)",
          render: ({ field }) => (
            <InputGroup>
              <InputGroupAddon>
                <MapPin className="w-5 h-5" />
              </InputGroupAddon>
              <InputGroupInput {...field} placeholder="Koordinatės (platuma)" />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "generalInfo.coordLng",
          label: "Koordinatės (ilguma)",
          render: ({ field }) => (
            <InputGroup>
              <InputGroupAddon>
                <MapPin className="w-5 h-5" />
              </InputGroupAddon>
              <InputGroupInput {...field} placeholder="Koordinatės (ilguma)" />
            </InputGroup>
          ),
        }}
      />

      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "generalInfo.relativeServiceRecipientId",
          label: "Susijęs asmuo",
          render: ({ field, fieldState }) => (
            <Select
              {...field}
              disabled={loadingRelativeSRs || validatingRelativeSRs}
              onValueChange={field.onChange}
              value={field.value ?? ""}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={fieldState.invalid}
              >
                <SelectValue
                  placeholder={
                    loadingRelativeSRs || validatingRelativeSRs
                      ? "Kraunami susiję asmenys..."
                      : "Susijęs asmuo"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {relativeServiceRecipients?.map((sr) => (
                  <SelectItem value={sr.id.toString()} key={sr.id}>
                    {sr.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ),
        }}
      />

      <div hidden={!relativeServiceRecipientId}>
        <FormFieldWrapper
          control={form.control}
          formField={{
            name: "generalInfo.relativeKinshipRelationId",
            label: "Susijusio asmens ryšys su klientu",
            render: ({ field, fieldState }) => (
              <Select
                {...field}
                disabled={loadingRelativeSRs || validatingRelativeSRs}
                onValueChange={field.onChange}
                value={field.value ?? ""}
              >
                <SelectTrigger
                  className="w-full"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue
                    placeholder={
                      loadingRelativeSRs || validatingRelativeSRs
                        ? "Kraunami ryšiai..."
                        : "Susijusio asmens ryšys su klientu"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {kinshipRelations?.map((kinshipRelation) => (
                    <SelectItem
                      value={kinshipRelation.id.toString()}
                      key={kinshipRelation.id}
                    >
                      {kinshipRelation.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ),
          }}
        />
      </div>
    </div>
  );
}
