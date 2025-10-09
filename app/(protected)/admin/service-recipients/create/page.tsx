"use client";

import { Card, CardContent } from "@/components/ui/card";
import GeneralInfoForm from "./general-info-form";
import { FormWizard, FormWizardStep } from "@/components/form-wizard";

export default function CreateServiceRecipientPage() {
  const onSubmit = async (data: any) => {
    startTransition(async () => {
      const formData = {
        ...data,
        gender,
        municipalityId: selectedMunicipality,
        relativeServiceRecipientId: relativeSR,
        relativeKinshipRelationId: relativeKinship,
      };

      // post create service recipient
    });
  };

  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent className="p-0">
        <FormWizard
          onComplete={() => {
            setTimeout(() => {}, 3000);
          }}
        >
          <FormWizardStep title="Pagrindinė informacija">
            <GeneralInfoForm />
          </FormWizardStep>
        </FormWizard>
      </CardContent>
    </Card>
  );
}
