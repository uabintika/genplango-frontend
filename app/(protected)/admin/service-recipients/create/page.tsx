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
    firstName: z.string().min(1, { error: "Šis laukelis yra privalomas" }),
    lastName: z.string().min(1, { error: "Šis laukelis yra privalomas" }),
    gender: z
      .string({ error: "Šis laukelis yra privalomas" })
      .refine((val) => !isNaN(Number(val)), {
        error: "Šis laukelis yra privalomas",
      }),

    birthDate: z
      .string()
      .min(1, { error: "Šis laukelis yra privalomas" })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        error: "Neteisingas gimimo datos formatas",
      }),

    municipalityId: z
      .string({ error: "Šis laukelis yra privalomas" })
      .refine((val) => !isNaN(Number(val)), {
        error: "Šis laukelis yra privalomas",
      }),

    address: z.string().min(1, { error: "Šis laukelis yra privalomas" }),
    houseNr: z.string().optional(),
    appartmentNr: z.string().optional(),

    coordLat: z
      .string()
      .min(1, { error: "Šis laukelis yra privalomas" })
      .refine((val) => !isNaN(Number(val)), {
        error: "Laukelio reikšmė privalo būti skaičius",
      }),
    coordLng: z
      .string({ error: "Šis laukelis yra privalomas" })
      .min(1, { error: "Šis laukelis yra privalomas" })
      .refine((val) => !isNaN(Number(val)), {
        error: "Laukelio reikšmė privalo būti skaičius",
      }),

    relativeServiceRecipientId: z
      .string({ error: "Šis laukelis yra privalomas" })
      .refine((val) => !isNaN(Number(val)), {
        error: "Šis laukelis yra privalomas",
      })
      .optional(),
    relativeKinshipRelationId: z
      .string({ error: "Šis laukelis yra privalomas" })
      .refine((val) => !isNaN(Number(val)), {
        error: "Šis laukelis yra privalomas",
      })
      .optional(),
  })
  .superRefine((val, ctx) => {
    if (
      val.relativeServiceRecipientId?.length &&
      !val.relativeKinshipRelationId?.length
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Pasirinkite ryšį",
        path: ["relativeKinshipRelationId"],
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
    defaultValues: {
      generalInfo: {
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        municipalityId: "",
        address: "",
        houseNr: "",
        appartmentNr: "",
        coordLat: "",
        coordLng: "",
        relativeServiceRecipientId: "",
        relativeKinshipRelationId: "",
      },
    },
    mode: "all",
  });

  const handleSubmit = async (data: CreateFormDataType) => {
    console.log(data);
  };

  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent className="p-0">
        <FormWizard
          form={form}
          onComplete={async (data: CreateFormDataType) => {
            await handleSubmit(data);
          }}
        >
          <FormWizardStep title="Pagrindinė informacija">
            <GeneralInfoForm />
          </FormWizardStep>
          <FormWizardStep title="Kontaktinė informacija">
            <ContactInfoForm />
          </FormWizardStep>
        </FormWizard>
      </CardContent>
    </Card>
  );
}
