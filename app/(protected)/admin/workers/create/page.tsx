"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormWizard, FormWizardStep } from "@/components/form-wizard";

import useGenericForm from "@/hooks/use-generic-form";
import { API_ROUTES } from "@/routes/api";
import { toast } from "sonner";
import { ROUTES } from "@/routes";
import { useRouter } from "next/navigation";
import { withoutKeys } from "@/lib/utils";
import { baseSchema, CreateWorkerBaseSchemaType } from "./schemas/base.schema";
import GeneralInfoSection from "./_components/general-info-section";
import AssignablesSection from "./_components/assignables-section";

export default function CreateWorkerPage() {
  const navigate = useRouter();
  const { form, submitForm, isLoading } = useGenericForm<
    typeof baseSchema,
    CreateWorkerBaseSchemaType
  >({
    mode: "Create",
    schema: baseSchema,
    mutateUrl: API_ROUTES.WORKERS.CREATE,
    useFormOptions: {
      defaultValues: baseSchema.parse({}),
    },
    onSuccess: () => {
      toast.success("Darbuotojas sukurtas sėkmingai!");
      navigate.push(ROUTES.ADMIN.WORKERS.INDEX);
    },
  });

  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent className="p-0">
        <FormWizard
          form={form}
          isLoading={isLoading}
          onComplete={async (data: CreateWorkerBaseSchemaType) => {
            await submitForm(data);
          }}
        >
          <FormWizardStep
            title="Pagrindinė informacija"
            onValidate={() =>
              form.trigger(
                withoutKeys<CreateWorkerBaseSchemaType>(baseSchema.def.shape, [
                  "assignables",
                ])
              )
            }
          >
            <GeneralInfoSection isLoading={isLoading} />
          </FormWizardStep>
          <FormWizardStep
            title="Priskyrimai"
            onValidate={() => form.trigger("assignables")}
          >
            <AssignablesSection isLoading={isLoading} />
          </FormWizardStep>
        </FormWizard>
      </CardContent>
    </Card>
  );
}
