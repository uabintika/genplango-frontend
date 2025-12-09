"use client";

import { FormFieldWrapper } from "@/components/ui/form";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { API_ROUTES } from "@/routes/api";
import useSWR from "swr";
import { useFormContext } from "react-hook-form";
import { CreateWorkerBaseSchemaType } from "../schemas/base.schema";
import { baseURL } from "@/config";

const buildUrl = (url: string, municipalities: string[]) => {
  const urlBuilder = new URL(baseURL + url);
  municipalities.forEach((val) => {
    urlBuilder.searchParams.append("municipalities[]", val);
  });
  return urlBuilder.toString();
};

export default function AssignablesSection({
  isLoading,
}: {
  isLoading?: boolean;
}) {
  const form = useFormContext<CreateWorkerBaseSchemaType>();
  const municipalities = form.watch("municipalities");

  const {
    data: serviceRecipients,
    isLoading: loadingServiceRecipients,
    isValidating: validatingServiceRecipients,
  } = useSWR<AllowedServiceRecipient[]>(
    buildUrl(API_ROUTES.SERVICE_RECIPIENTS.FOR_SELECT, municipalities)
  );

  const {
    data: coordinators,
    isLoading: loadingCoordinators,
    isValidating: validatingCoordinators,
  } = useSWR<AllowedCoordinator[]>(
    buildUrl(API_ROUTES.USERS.FOR_SELECT, municipalities)
  );

  return (
    <div className="gap-4">
      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "assignables.coordinators",
          label: "Koordinatoriai",
          formControlContainerClassName: "overflow-hidden",
          render: ({ field }) => (
            <MultiSelect
              values={field.value?.map(String)}
              onValuesChange={(values) =>
                field.onChange(values.map((v) => Number(v)))
              }
            >
              <MultiSelectTrigger
                disabled={
                  loadingCoordinators || validatingCoordinators || isLoading
                }
              >
                <MultiSelectValue
                  placeholder={
                    loadingCoordinators || validatingCoordinators || isLoading
                      ? "Kraunami koordinatoriai..."
                      : "Pasirinkite koordinatoriu..."
                  }
                />
              </MultiSelectTrigger>

              <MultiSelectContent>
                <MultiSelectGroup>
                  {coordinators?.map((c) => (
                    <MultiSelectItem value={c.id.toString()} key={c.id}>
                      {c.firstName + " " + c.lastName}
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
          name: "assignables.serviceRecipients",
          label: "Klientai",
          formControlContainerClassName: "overflow-hidden",
          render: ({ field }) => (
            <MultiSelect
              values={field.value?.map(String)}
              onValuesChange={(values) =>
                field.onChange(values.map((v) => Number(v)))
              }
            >
              <MultiSelectTrigger
                disabled={
                  loadingServiceRecipients ||
                  validatingServiceRecipients ||
                  isLoading
                }
              >
                <MultiSelectValue
                  placeholder={
                    loadingCoordinators || validatingCoordinators || isLoading
                      ? "Kraunami klientai..."
                      : "Pasirinkite klientą..."
                  }
                />
              </MultiSelectTrigger>

              <MultiSelectContent>
                <MultiSelectGroup>
                  {serviceRecipients?.map((sr) => (
                    <MultiSelectItem value={sr.id.toString()} key={sr.id}>
                      {sr.fullName}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
          ),
        }}
      />
    </div>
  );
}
