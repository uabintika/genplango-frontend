"use client";

import { FormFieldWrapper } from "@/components/ui/form";
import Input from "@/components/ui/input";
import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import useSWR from "swr";
import { KinshipRelation } from "./general-info-form";
import { API_ROUTES } from "@/routes/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, UserMinus2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ServiceRecipientFormSchemaType } from "./schemas";
import { useFormContext } from "react-hook-form";

export default function ContactInfoForm({
  isLoading,
}: {
  isLoading?: boolean;
}) {
  const form = useFormContext<ServiceRecipientFormSchemaType>();

  const contacts = form.watch("contacts") ?? [];

  const addContact = () => {
    form.setValue("contacts", [
      ...contacts,
      {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        isDefault: false,
        kinshipRelationId: "",
      },
    ]);
  };

  const removeContact = (index: number) => {
    const contactsTemp = contacts.filter((_, id) => id !== index);
    form.setValue("contacts", contactsTemp);
  };

  const {
    data: kinshipRelations,
    isLoading: loadingKinships,
    isValidating: validatingKinships,
  } = useSWR<Array<KinshipRelation>>(API_ROUTES.KINSHIP_RELATIONS.FOR_SELECT, {
    revalidateOnMount: false,
  });

  return (
    <div className="flex flex-1 flex-col">
      <div>
        {contacts.map((_, index) => (
          <div key={index}>
            <Button
              size="sm"
              color="destructive"
              className="mr-auto"
              onClick={() => removeContact(index)}
              disabled={isLoading}
            >
              Šalinti
              <UserMinus2Icon size="18" className="ml-2" />
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <FormFieldWrapper
                control={form.control}
                formField={{
                  name: `contacts.${index}.firstName`,
                  label: "Kontaktinio asmens vardas",
                  render: ({ field }) => (
                    <Input
                      {...field}
                      placeholder="Vardas"
                      disabled={isLoading}
                    />
                  ),
                }}
              />

              <FormFieldWrapper
                control={form.control}
                formField={{
                  name: `contacts.${index}.lastName`,
                  label: "Kontaktinio asmens pavardė",
                  render: ({ field }) => (
                    <Input
                      {...field}
                      placeholder="Pavardė"
                      disabled={isLoading}
                    />
                  ),
                }}
              />

              <FormFieldWrapper
                control={form.control}
                formField={{
                  name: `contacts.${index}.phoneNumber`,
                  label: "Kontaktinio asmens tel. nr.",
                  render: ({ field }) => (
                    <Input
                      {...field}
                      placeholder="Tel. nr."
                      disabled={isLoading}
                    />
                  ),
                }}
              />

              <FormFieldWrapper
                control={form.control}
                formField={{
                  name: `contacts.${index}.kinshipRelationId`,
                  label: "Kontaktinio asmens ryšys su klientu",
                  render: ({ field, fieldState }) => (
                    <Select
                      {...field}
                      disabled={
                        loadingKinships || validatingKinships || isLoading
                      }
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue
                          placeholder={
                            loadingKinships || validatingKinships
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

              <FormFieldWrapper
                control={form.control}
                formField={{
                  name: `contacts.${index}.isDefault`,
                  label: "Numatytas kontaktinis asmuo",
                  render: ({ field }) => (
                    <Checkbox
                      defaultChecked={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                    />
                  ),
                }}
              />
            </div>
            {contacts.length - 1 !== index && <Separator className="my-4" />}
          </div>
        ))}
      </div>
      <Button
        className="mx-auto"
        variant="shadow"
        size="sm"
        onClick={() => addContact()}
        disabled={isLoading}
      >
        Pridėti kontaktą <Plus size="18" />
      </Button>
    </div>
  );
}
