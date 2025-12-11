"use client";

import AssignablesSection from "../../../create/_components/assignables-section";
import {
  assignablesFormSchema,
  AssignablesFormSchemaType,
} from "../schemas/assignables.schema";
import { Form } from "@/components/ui/form";
import { API_ROUTES } from "@/routes/api";
import useGenericForm from "@/hooks/use-generic-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UserLock } from "lucide-react";
import React from "react";

type AssignablesFormSectionProps = {
  userId: number;
  isLoading?: boolean;
};

export default function AssignablesFormSection({
  userId,
  isLoading,
}: AssignablesFormSectionProps) {
  const {
    form,
    submitForm,
    isLoading: loadingFormData,
  } = useGenericForm<typeof assignablesFormSchema, AssignablesFormSchemaType>({
    mode: "Update",
    schema: assignablesFormSchema,
    mutateUrl: API_ROUTES.USERS.PERMISSIONS.UPDATE(userId),
    fetchModelUrl: API_ROUTES.USERS.PERMISSIONS.GET(userId),
    useFormOptions: {
      mode: "all",
    },
    onSuccess: () => {
      toast.success("Prieiga atnaujinta sėkmingai!");
    },
  });

  return (
    <div className="px-5 sm:px-8 md:px-24 lg:px-52">
      <Form {...form}>
        <AssignablesSection
          form={form}
          isLoading={isLoading || loadingFormData}
          formNamePrefix="assignables"
        />
      </Form>
      <div className="flex justify-end my-5">
        <Button
          color="primary"
          size="md"
          className="space-x-2"
          isLoading={isLoading || loadingFormData}
          type="button"
          onClick={async () => {
            const valid = await form.trigger();

            if (valid) {
              form.handleSubmit(submitForm)();
            }
          }}
        >
          <span>Išsaugoti prieigos duomenis</span> <UserLock size={18} />
        </Button>
      </div>
    </div>
  );
}
