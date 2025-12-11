"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormWizard, FormWizardStep } from "@/components/form-wizard";

import useGenericForm from "@/hooks/use-generic-form";
import { API_ROUTES } from "@/routes/api";
import { toast } from "sonner";
import { ROUTES } from "@/routes";
import { useRouter } from "next/navigation";
import { withoutKeys } from "@/lib/utils";
import { createUserSchema, CreateUserSchemaType } from "./schemas/base.schema";
import GeneralInfoSection from "./_components/general-info-section";
import LoginInfoSection from "./_components/login-info-section";
import AssignablesSection from "./_components/assignables-section";

export default function CreateWorkerPage() {
  const navigate = useRouter();
  const { form, submitForm, isLoading } = useGenericForm<
    typeof createUserSchema,
    CreateUserSchemaType
  >({
    mode: "Create",
    schema: createUserSchema,
    mutateUrl: API_ROUTES.USERS.CREATE,
    useFormOptions: {
      mode: "all",
    },
    onSuccess: () => {
      toast.success("Naudotojas sukurtas sėkmingai!");
      navigate.push(ROUTES.ADMIN.USERS.INDEX);
    },
  });

  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent className="p-0">
        <FormWizard
          form={form}
          isLoading={isLoading}
          onComplete={async (data: CreateUserSchemaType) => {
            await submitForm(data);
          }}
        >
          <FormWizardStep
            title="Pagrindinė informacija"
            onValidate={() =>
              form.trigger(
                withoutKeys<CreateUserSchemaType>(createUserSchema.def.shape, [
                  "loginData",
                  "assignables",
                ])
              )
            }
          >
            <GeneralInfoSection form={form} isLoading={isLoading} />
          </FormWizardStep>
          <FormWizardStep
            title="Prisijungimo informacija"
            onValidate={() => form.trigger("loginData")}
          >
            <LoginInfoSection
              form={form}
              isLoading={isLoading}
              formNamePrefix="loginData"
            />
          </FormWizardStep>
          <FormWizardStep
            title="Prieiga"
            onValidate={() => form.trigger("assignables")}
          >
            <AssignablesSection
              form={form}
              isLoading={isLoading}
              formNamePrefix="assignables"
            />
          </FormWizardStep>
        </FormWizard>
      </CardContent>
    </Card>
  );
}
