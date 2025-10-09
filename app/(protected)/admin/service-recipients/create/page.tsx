"use client";

import { Card, CardContent } from "@/components/ui/card";
import GeneralInfoForm from "./general-info-form";
import { FormWizard, FormWizardStep } from "@/components/form-wizard";

import { generalInfoSchema } from "./general-info-form";
import z from "zod";

type CreateFormDataType = {
  generalInfo: z.infer<typeof generalInfoSchema>;
};

export default function CreateServiceRecipientPage() {
  const handleSubmit = async (data: CreateFormDataType) => {
    console.log(data);
  };

  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent className="p-0">
        <FormWizard
          onComplete={async (data: CreateFormDataType) => {
            await handleSubmit(data);
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
