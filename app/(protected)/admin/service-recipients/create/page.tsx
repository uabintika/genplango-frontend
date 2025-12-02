"use client";

import { Card, CardContent } from "@/components/ui/card";
import GeneralInfoForm from "./general-info-form";
import { FormWizard, FormWizardStep } from "@/components/form-wizard";

import ContactInfoForm from "./contact-info-form";
import useGenericForm from "@/hooks/use-generic-form";
import { API_ROUTES } from "@/routes/api";
import { toast } from "sonner";
import { ROUTES } from "@/routes";
import { useRouter } from "next/navigation";
import { withoutKeys } from "@/lib/utils";
import { baseFormSchema, MasterCreateSRFormSchemaType } from "./schemas";
import AssignablesForm from "./assignables-form";

export default function CreateServiceRecipientPage() {
  const navigate = useRouter();
  const { form, submitForm, isLoading } = useGenericForm<
    typeof baseFormSchema,
    MasterCreateSRFormSchemaType
  >({
    mode: "Create",
    schema: baseFormSchema,
    mutateUrl: API_ROUTES.SERVICE_RECIPIENTS.CREATE,
    useFormOptions: {
      defaultValues: {
        firstName: "",
        lastName: "",
        birthDate: "",
        status: "",
        address: "",
        houseNr: "",
        appartmentNr: "",
        coordLat: "",
        coordLng: "",
        relativeServiceRecipientId: "",
        relativeKinshipRelationId: "",
        receivesAmbulatoryServices: false,
        contactInfo: [],
      },
      mode: "all",
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
          onComplete={async (data: MasterCreateSRFormSchemaType) => {
            await submitForm(data);
          }}
        >
          <FormWizardStep
            title="Pagrindinė informacija"
            onValidate={() =>
              form.trigger(
                withoutKeys<MasterCreateSRFormSchemaType>(
                  baseFormSchema.def.shape,
                  ["contactInfo", "assignables"]
                )
              )
            }
          >
            <GeneralInfoForm />
          </FormWizardStep>
          <FormWizardStep
            title="Kontaktinė informacija"
            onValidate={() => form.trigger("contactInfo")}
          >
            <ContactInfoForm />
          </FormWizardStep>
          <FormWizardStep
            title="Darbuotojai"
            onValidate={() => form.trigger("assignables")}
          >
            <AssignablesForm />
          </FormWizardStep>
        </FormWizard>
      </CardContent>
    </Card>
  );
}
