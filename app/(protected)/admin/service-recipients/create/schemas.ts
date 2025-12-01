import z from "zod";

export const contactInfoSchema = z.object({
  firstName: z.string().min(1, { error: "Šis laukelis yra privalomas" }),
  lastName: z.string().min(1, { error: "Šis laukelis yra privalomas" }),
  kinshipRelationId: z
    .string({ error: "Šis laukelis yra privalomas" })
    .refine((val) => !isNaN(Number(val)), {
      error: "Šis laukelis yra privalomas",
    }),
  phoneNumber: z.string().min(1, { error: "Šis laukelis yra privalomas" }),
  isDefault: z.boolean().default(false),
});

export type ContactInfoSchemaType = z.infer<typeof contactInfoSchema>;

export const workersSchema = z.object({
  coordinators: z.array(z.number()).optional(),
  workers: z.array(z.number()).optional(),
});

export const baseFormSchema = z
  .object({
    firstName: z.string().min(1, { error: "Šis laukelis yra privalomas" }),
    lastName: z.string().min(1, { error: "Šis laukelis yra privalomas" }),
    gender: z
      .string({ error: "Šis laukelis yra privalomas" })
      .refine((val) => !isNaN(Number(val)), {
        error: "Šis laukelis yra privalomas",
      }),

    status: z
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
    receivesAmbulatoryServices: z.boolean().default(false),
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
    workersInfo: workersSchema,
  });

export type MasterCreateSRFormSchemaType = z.infer<typeof baseFormSchema>;
