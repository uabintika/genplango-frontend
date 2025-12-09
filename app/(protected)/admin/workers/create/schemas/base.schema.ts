import { zId } from "@/lib/base-schemas";
import z from "zod";
import { assignablesSchema } from "./assignables.schema";
import { loginInfoSchema } from "./login.schema";

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

  address: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .default(""),
  houseNr: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .default(""),
  apartmentNr: z
    .string()
    .nullish()
    .transform((v) => v ?? ""),

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
