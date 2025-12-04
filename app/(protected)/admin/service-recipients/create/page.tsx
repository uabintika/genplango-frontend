"use client";

import { Card, CardContent } from "@/components/ui/card";
import GeneralInfoForm from "./_components/general-info-section";
import { FormWizard, FormWizardStep } from "@/components/form-wizard";

import useGenericForm from "@/hooks/use-generic-form";
import { API_ROUTES } from "@/routes/api";
import { toast } from "sonner";
import { ROUTES } from "@/routes";
import { useRouter } from "next/navigation";
import { withoutKeys } from "@/lib/utils";
import AssignablesForm from "./_components/assignables-section";
import ContactsFormSection from "./_components/contacts-section";
import {
  baseFormSchema,
  CreateServiceRecipientFormSchemaType,
} from "./schemas/base.schema";

export default function CreateServiceRecipientPage() {
  const navigate = useRouter();
  const { form, submitForm, isLoading } = useGenericForm<
    typeof baseFormSchema,
    CreateServiceRecipientFormSchemaType
  >({
    mode: "Create",
    schema: baseFormSchema,
    mutateUrl: API_ROUTES.SERVICE_RECIPIENTS.CREATE,
    useFormOptions: {
      defaultValues: baseFormSchema.parse({}),
    },
    onSuccess: () => {
      toast.success("Klientas sukurtas sėkmingai!");
      navigate.push(ROUTES.ADMIN.SERVICE_RECIPIENTS.INDEX);
    },
  });

  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent className="p-0">
        <FormWizard
          form={form}
          isLoading={isLoading}
          onComplete={async (data: CreateServiceRecipientFormSchemaType) => {
            await submitForm(data);
          }}
        >
          <FormWizardStep
            title="Pagrindinė informacija"
            onValidate={() =>
              form.trigger(
                withoutKeys<CreateServiceRecipientFormSchemaType>(
                  baseFormSchema.def.shape,
                  ["contacts", "assignables"]
                )
              )
            }
          >
            <GeneralInfoForm isLoading={isLoading} />
          </FormWizardStep>
          <FormWizardStep
            title="Kontaktinė informacija"
            onValidate={() => form.trigger("contacts")}
          >
            <ContactsFormSection isLoading={isLoading} />
          </FormWizardStep>
          <FormWizardStep
            title="Darbuotojai"
            onValidate={() => form.trigger("assignables")}
          >
            <AssignablesForm isLoading={isLoading} />
          </FormWizardStep>
        </FormWizard>
      </CardContent>
    </Card>
  );
}
