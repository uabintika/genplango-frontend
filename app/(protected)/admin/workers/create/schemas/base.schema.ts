import { zId, zRequiredString } from "@/lib/base-schemas";
import z from "zod";
import { assignablesSchema } from "./assignables.schema";
import { loginInfoSchema } from "./login.schema";

export const generalInfoSchema = z.object({
  firstName: zRequiredString,
  lastName: zRequiredString,

  gender: zId,
  status: zId,

  municipalities: z
    .array(zId)
    .nonempty("Šis laukelis yra privalomas")
    .default([]),

  workStartDate: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Neteisingas gimimo datos formatas",
    })
    .default(""),

  address: zRequiredString,
  houseNr: zRequiredString,
  apartmentNr: z
    .string()
    .nullish()
    .transform((v) => v ?? ""),

  phoneNumber: zRequiredString,

  coordLat: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Laukelio reikšmė privalo būti skaičius",
    })
    .nullish()
    .transform((v) => v ?? ""),

  coordLng: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Laukelio reikšmė privalo būti skaičius",
    })
    .nullish()
    .transform((v) => v ?? ""),
});

export type WorkerGeneralInfoSchemaType = z.infer<typeof generalInfoSchema>;

export const baseSchema = generalInfoSchema.safeExtend({
  assignables: assignablesSchema,
  loginData: loginInfoSchema.default({
    workerEmail: "",
    workerPassword: "",
  }),
});

export type CreateWorkerBaseSchemaType = z.infer<typeof baseSchema>;
