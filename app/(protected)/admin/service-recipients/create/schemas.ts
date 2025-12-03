import z from "zod";

//
// Helper for ID fields (accepts number or string and converts to string)
//
const zId = z
  .union([z.string(), z.number()])
  .transform((v) => v.toString())
  .refine((v) => v.length > 0 && !isNaN(Number(v)), {
    message: "Šis laukelis yra privalomas",
  })
  .default("");

export const contactInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .default(""),
  lastName: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .default(""),
  kinshipRelationId: zId.default(""),
  phoneNumber: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .default(""),
  isDefault: z.boolean().default(false),
});

export type ContactInfoSchemaType = z.infer<typeof contactInfoSchema>;

export const assignablesSchema = z
  .object({
    coordinators: z.array(z.number()).optional(),
    workers: z.array(z.number()).optional(),
  })
  .default({});

export const baseFormSchema = z
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
  })
  .superRefine((val, ctx) => {
    if (val.relativeServiceRecipientId && !val.relativeKinshipRelationId) {
      ctx.addIssue({
        code: "custom",
        message: "Pasirinkite ryšį",
        path: ["relativeKinshipRelationId"],
      });
    }
  })
  .safeExtend({
    contacts: z.array(contactInfoSchema).optional(),
    assignables: assignablesSchema,
  });

export type ServiceRecipientFormSchemaType = z.infer<typeof baseFormSchema>;
