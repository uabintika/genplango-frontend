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
import { FieldValue, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useFieldPrefix } from "@/hooks/use-field-prefix";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Loader from "@/components/ui/loader";
import { motion } from "framer-motion";
import Input from "@/components/ui/input";
import { UserRole } from "@/types/enum.types";

type MunicipalityForPermissions = {
  id: number;
  name: string;
  workers: AllowedWorker[];
  serviceRecipients: AllowedServiceRecipient[];
};

type AssignablesSectionProps<TForm extends FieldValues> = {
  form: UseFormReturn<TForm>;
  isLoading?: boolean;
  formNamePrefix?: string;
};

export default function AssignablesSection<TForm extends FieldValues>({
  form,
  isLoading,
  formNamePrefix,
}: AssignablesSectionProps<TForm>) {
  const selectedRole = form.watch("role" as Path<TForm>) as FieldValue<TForm>;
  const { prefixed } = useFieldPrefix<TForm>(formNamePrefix);
  const [selectedMunicipality, setSelectedMunicipality] = React.useState<
    number | null
  >(null);

  const {
    data: municipalities,
    isLoading: loadingMunicipalities,
    isValidating: validatingMunicipalities,
  } = useSWR<Array<MunicipalityForPermissions>>(
    API_ROUTES.MUNICIPALITIES.PERMISSIONS
  );

  React.useEffect(() => {
    if (municipalities?.length && !selectedMunicipality) {
      setSelectedMunicipality(municipalities[0].id);
    }
  }, [municipalities, selectedMunicipality]);

  if (selectedRole === UserRole.Administrator) {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-5">
          Administratoriui prieiga nėra nustatoma
        </h3>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Prieiga:</h3>

      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-0 flex-wrap gap-2 h-full sm:h-full min-w-[100px] md:min-w-[115px] max-w-[100px] md:max-w-[115px]">
          {municipalities?.map((m) => (
            <Button
              size="sm"
              key={m.id}
              variant="outline"
              className={cn("w-full py-1.5 h-auto whitespace-normal", {
                "bg-default text-default-foreground ring-0 ring-transparent":
                  selectedMunicipality === m.id,
              })}
              onClick={() => setSelectedMunicipality(m.id)}
              disabled={loadingMunicipalities || validatingMunicipalities}
            >
              {m.name}
            </Button>
          ))}
          {(loadingMunicipalities || validatingMunicipalities) && (
            <Loader className="mx-auto" />
          )}
        </div>

        <Card className="gap-4 flex-1 shadow-md border dark:border-white">
          <CardContent className="p-6">
            <motion.div
              key={selectedMunicipality}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {municipalities?.map((m) => {
                const isSelected = m.id === selectedMunicipality;
                if (!isSelected) return null;

                const path = (field: string) =>
                  prefixed(`${m.id}.${field}` as Path<TForm>);

                return (
                  <div key={m.id} hidden={selectedMunicipality !== m.id}>
                    <FormFieldWrapper
                      control={form.control}
                      formField={{
                        name: path("municipalityId"),
                        render: ({ field }) => (
                          <Input
                            {...field}
                            type="hidden"
                            value={field.value ?? ""}
                          />
                        ),
                      }}
                    />

                    <FormFieldWrapper
                      control={form.control}
                      formField={{
                        name: path("workers"),
                        label: "Darbuotojai",
                        formControlContainerClassName: "overflow-hidden",
                        render: ({ field }) => (
                          <MultiSelect
                            values={field.value?.map(String)}
                            onValuesChange={(values) => {
                              field.onChange(values);

                              const currentSRs =
                                form.getValues(path("serviceRecipients")) || [];

                              // Only clear municipality if BOTH are empty
                              if (values.length > 0 || currentSRs.length > 0) {
                                form.setValue(
                                  path("municipalityId"),
                                  m.id as FieldValue<TForm>
                                );
                              } else {
                                form.setValue(
                                  path("municipalityId"),
                                  null as FieldValue<TForm>
                                );
                              }
                            }}
                          >
                            <MultiSelectTrigger disabled={isLoading}>
                              <MultiSelectValue placeholder="Pasirinkite darbuotoją..." />
                            </MultiSelectTrigger>

                            <MultiSelectContent>
                              <MultiSelectGroup>
                                {m.workers?.map((c) => (
                                  <MultiSelectItem
                                    value={c.id.toString()}
                                    key={c.id}
                                  >
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
                        name: path("serviceRecipients"),
                        label: "Klientai",
                        formControlContainerClassName: "overflow-hidden",
                        render: ({ field }) => (
                          <MultiSelect
                            values={field.value?.map(String)}
                            onValuesChange={(values) => {
                              field.onChange(values);

                              const currentWorkers =
                                form.getValues(path("workers")) || [];

                              if (
                                values.length > 0 ||
                                currentWorkers.length > 0
                              ) {
                                form.setValue(
                                  path("municipalityId"),
                                  m.id as FieldValue<TForm>
                                );
                              } else {
                                form.setValue(
                                  path("municipalityId"),
                                  null as FieldValue<TForm>
                                );
                              }
                            }}
                          >
                            <MultiSelectTrigger disabled={isLoading}>
                              <MultiSelectValue placeholder="Pasirinkite klientą..." />
                            </MultiSelectTrigger>

                            <MultiSelectContent>
                              <MultiSelectGroup>
                                {m.serviceRecipients?.map((sr) => (
                                  <MultiSelectItem
                                    value={sr.id.toString()}
                                    key={sr.id}
                                  >
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
              })}
              {(loadingMunicipalities || validatingMunicipalities) && (
                <Loader className="mx-auto" />
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
