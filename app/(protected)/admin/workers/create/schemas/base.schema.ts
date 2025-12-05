import { zId } from "@/lib/base-schemas";
import z from "zod";
import { assignablesSchema } from "./assignables.schema";

export const generalInfoSchema = z.object({
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

  municipalities: z.array(zId).default([]),

  workStartDate: z
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
  houseNr: z.string().default(""),
  apartmentNr: z.string().optional().default(""),

  phoneNumber: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .default(""),

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
});

export type WorkerGeneralInfoSchemaType = z.infer<typeof generalInfoSchema>;

export const baseSchema = generalInfoSchema.safeExtend({
  assignables: assignablesSchema,
});

export type CreateWorkerBaseSchemaType = z.infer<typeof baseSchema>;
