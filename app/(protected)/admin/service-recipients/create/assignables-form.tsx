"use client";

import { useFormWizard } from "@/components/form-wizard/context";
import { FormFieldWrapper } from "@/components/ui/form";
import { MasterCreateSRFormSchemaType } from "./schemas";
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

type AllowedCoordinator = {
  id: number;
  firstName: string;
  lastName: string;
};

type AllowedWorker = {
  id: number;
  firstName: string;
  lastName: string;
};

export default function AssignablesForm() {
  const { form } = useFormWizard<MasterCreateSRFormSchemaType>();

  const {
    data: workers,
    isLoading: loadingWorkers,
    isValidating: validatingWorkers,
  } = useSWR<AllowedWorker[]>(API_ROUTES.WORKERS.FOR_SELECT, {});

  const {
    data: coordinators,
    isLoading: loadingCoordinators,
    isValidating: validatingCoordinators,
  } = useSWR<AllowedCoordinator[]>(API_ROUTES.USERS.FOR_SELECT, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormFieldWrapper
        control={form.control}
        formField={{
          name: "workersInfo.coordinators",
          label: "Koordinatoriai",
          render: ({ field }) => (
            <MultiSelect
              values={field.value?.map(String)}
              onValuesChange={(values) =>
                field.onChange(values.map((v) => Number(v)))
              }
            >
              <MultiSelectTrigger
                className="w-full"
                disabled={loadingCoordinators || validatingCoordinators}
              >
                <MultiSelectValue placeholder="Pasirinkite koordinatoriu..." />
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
          name: "workersInfo.workers",
          label: "IPD",
          render: ({ field }) => (
            <MultiSelect
              values={field.value?.map(String)}
              onValuesChange={(values) =>
                field.onChange(values.map((v) => Number(v)))
              }
            >
              <MultiSelectTrigger
                className="w-full"
                disabled={loadingWorkers || validatingWorkers}
              >
                <MultiSelectValue placeholder="Pasirinkite IPD..." />
              </MultiSelectTrigger>

              <MultiSelectContent>
                <MultiSelectGroup>
                  {workers?.map((c) => (
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
    </div>
  );
}
