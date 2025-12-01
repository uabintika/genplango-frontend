"use client";

import { Card, CardContent } from "@/components/ui/card";
import GeneralInfoForm from "./general-info-form";
import { FormWizard, FormWizardStep } from "@/components/form-wizard";

import z from "zod";
import ContactInfoForm from "./contact-info-form";
import useGenericForm from "@/hooks/use-generic-form";
import { API_ROUTES } from "@/routes/api";
import { toast } from "sonner";
import { ROUTES } from "@/routes";
import { useRouter } from "next/navigation";
import { withoutKeys } from "@/lib/utils";

export const contactInfoSchema = z.object({
  firstName: z.string().min(1, { error: "Šis laukelis yra privalomas" }),
  lastName: z.string().min(1, { error: "Šis laukelis yra privalomas" }),
  kinshipRelationId: z
    .string({ error: "Šis laukelis yra privalomas" })
    .refine((val) => !isNaN(Number(val)), {
      error: "Šis laukelis yra privalomas",
    }),
  phoneNumber: z.string().min(1, { error: "Šis laukelis yra privalomas" }),
  isDefault: z.boolean(),
});

export type ContactInfoSchemaType = z.infer<typeof contactInfoSchema>;

export const baseFormSchema = z
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
  })
  .safeExtend({
    contactInfo: z.array(contactInfoSchema).optional(),
  });

export type MasterCreateSRFormSchemaType = z.infer<typeof baseFormSchema>;

export default function CreateServiceRecipientPage() {
  const navigate = useRouter();
  const { form, submitForm, isLoading, createdModel } = useGenericForm<
    MasterCreateSRFormSchemaType,
    typeof baseFormSchema
  >({
    mode: "Create",
    schema: baseFormSchema,
    mutateUrl: API_ROUTES.SERVICE_RECIPIENTS.CREATE,
    useFormOptions: {
      defaultValues: {
        firstName: "",
        lastName: "",
        birthDate: "",
        address: "",
        houseNr: "",
        appartmentNr: "",
        coordLat: "",
        coordLng: "",
        relativeServiceRecipientId: "",
        relativeKinshipRelationId: "",
        contactInfo: [],
      },
      mode: "all",
    },
  });

  const handleSubmit = async (data: MasterCreateSRFormSchemaType) => {
    await submitForm(data);
  };

  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent className="p-0">
        <FormWizard
          form={form}
          isLoading={isLoading}
          onComplete={async (data: MasterCreateSRFormSchemaType) => {
            await handleSubmit(data);
            toast.success("Klientas sukurtas sėkmingai!");
            navigate.push(ROUTES.ADMIN.SERVICE_RECIPIENTS.INDEX);
          }}
        >
          <FormWizardStep
            title="Pagrindinė informacija"
            onValidate={() =>
              form.trigger(
                withoutKeys<MasterCreateSRFormSchemaType>(
                  baseFormSchema.def.shape,
                  ["contactInfo"]
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
        </FormWizard>
      </CardContent>
    </Card>
  );
}
