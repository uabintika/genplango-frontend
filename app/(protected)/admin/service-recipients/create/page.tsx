"use client";

import { Card, CardContent } from "@/components/ui/card";
import GeneralInfoForm from "./general-info-form";
import { FormWizard, FormWizardStep } from "@/components/form-wizard";

import z from "zod";
import ContactInfoForm from "./contact-info-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const generalInfoSchema = z
  .object({
    firstName: z.string().min(1, { message: "required" }),
    lastName: z.string().min(1, { message: "required" }),
    gender: z
      .string({ error: "required" })
      .refine((val) => !isNaN(Number(val)), { message: "required" }),

    birthDate: z
      .string()
      .min(1, { message: "required" })
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "invalid_date_format" }),

    municipalityId: z
      .string({ error: "required" })
      .refine((val) => !isNaN(Number(val)), { message: "required" }),

    address: z.string().min(1, { message: "required" }),
    houseNr: z.string().optional(),
    appartmentNr: z.string().optional(),

    coordLat: z
      .string()
      .min(1, { message: "required" })
      .refine((val) => !isNaN(Number(val)), { message: "must_be_a_number" }),
    coordLng: z
      .string()
      .min(1, { message: "required" })
      .refine((val) => !isNaN(Number(val)), { message: "must_be_a_number" }),

    relativeServiceRecipientId: z
      .string({ error: "required" })
      .refine((val) => !isNaN(Number(val)), { message: "required" })
      .optional(),
    relativeKinshipRelationId: z
      .string({ error: "required" })
      .refine((val) => !isNaN(Number(val)), { message: "required" })
      .optional(),
  })
  .superRefine((val, ctx) => {
    if (
      val.relativeServiceRecipientId?.length &&
      !val.relativeKinshipRelationId?.length
    ) {
      ctx.addIssue({
        code: "custom",
        message: "required_with",
        path: ["relativeServiceRecipientId"],
      });
    }
  });

const createServiceRecipientSchema = z.object({
  generalInfo: generalInfoSchema,
});

export type MasterCreateSRFormSchemaType = z.infer<
  typeof createServiceRecipientSchema
>;

type CreateFormDataType = z.infer<typeof createServiceRecipientSchema>;

export default function CreateServiceRecipientPage() {
  const form = useForm<MasterCreateSRFormSchemaType>({
    resolver: zodResolver(createServiceRecipientSchema),
  });

  const handleSubmit = async (data: CreateFormDataType) => {
    console.log(data);
  };

  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent className="p-0">
        <FormWizard<MasterCreateSRFormSchemaType>
          form={form}
          onComplete={async (data: CreateFormDataType) => {
            await handleSubmit(data);
          }}
        >
          <FormWizardStep title="Pagrindinė informacija">
            <GeneralInfoForm schema={generalInfoSchema} />
          </FormWizardStep>
          <FormWizardStep title="Kontaktinė informacija">
            <ContactInfoForm />
          </FormWizardStep>
        </FormWizard>
      </CardContent>
    </Card>
  );
}
