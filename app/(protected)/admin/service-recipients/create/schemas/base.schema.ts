import { zId } from "@/lib/base-schemas";
import z from "zod";
import { contactsSchema } from "./contacts.schema";
import { assignablesSchema } from "./assignables.schema";

export const generalInfoFormSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "Šis laukelis yra privalomas" })
      .default(""),
    lastName: z
      .string()
      .min(1, { message: "Šis laukelis yra privalomas" })
      .default(""),

    gender: zId,
    status: zId,
    municipalityId: zId,

    birthDate: z
      .string()
      .min(1, { message: "Šis laukelis yra privalomas" })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Neteisingas gimimo datos formatas",
      })
      .default(""),

    address: z
      .string()
      .min(1, { message: "Šis laukelis yra privalomas" })
      .default(""),
    houseNr: z.string().optional(),
    appartmentNr: z.string().optional(),

    coordLat: z
      .string()
      .min(1, { message: "Šis laukelis yra privalomas" })
      .refine((val) => !isNaN(Number(val)), {
        message: "Laukelio reikšmė privalo būti skaičius",
      })
      .default(""),

    coordLng: z
      .string()
      .min(1, { message: "Šis laukelis yra privalomas" })
      .refine((val) => !isNaN(Number(val)), {
        message: "Laukelio reikšmė privalo būti skaičius",
      })
      .default(""),

    relativeServiceRecipientId: zId.optional().nullable(),
    relativeKinshipRelationId: zId.optional().nullable(),

    receivesAmbulatoryServices: z.boolean().default(false),

    methodologyStartDate: z
      .string()
      .nullish()
      .transform((val) => val ?? "")
      .refine((val) => val === "" || /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: "Neteisingas gimimo datos formatas",
      })
      .default(""),

    agreementNr: z
      .string()
      .nullish()
      .transform((val) => val ?? "")
      .default(""),

    agreementDate: z
      .string()
      .nullish()
      .transform((val) => val ?? "")
      .refine((val) => val === "" || /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: "Neteisingas gimimo datos formatas",
      })
      .default(""),

    decisionNr: z
      .string()
      .nullish()
      .transform((val) => val ?? "")
      .default(""),

    decisionDate: z
      .string()
      .nullish()
      .transform((val) => val ?? "")
      .refine((val) => val === "" || /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: "Neteisingas gimimo datos formatas",
      })
      .default(""),

    methodologyUpdatedAt: z
      .string()
      .nullish()
      .transform((val) => val ?? "")
      .default(""),
  })
  .superRefine((val, ctx) => {
    if (val.relativeServiceRecipientId && !val.relativeKinshipRelationId) {
      ctx.addIssue({
        code: "custom",
        message: "Pasirinkite ryšį",
        path: ["relativeKinshipRelationId"],
      });
    }
  });

export type GeneralInfoFormSchema = z.infer<typeof generalInfoFormSchema>;

export const baseFormSchema = generalInfoFormSchema.safeExtend({
  contacts: z.array(contactsSchema).optional(),
  assignables: assignablesSchema,
});

export type CreateServiceRecipientFormSchemaType = z.infer<
  typeof baseFormSchema
>;
