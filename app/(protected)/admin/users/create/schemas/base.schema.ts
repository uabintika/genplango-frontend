import z from "zod";
import { loginInfoSchema } from "./login.schema";
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

  duty: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .default(""),

  phoneNumber: z
    .string()
    .nullish()
    .transform((v) => v ?? ""),

  role: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .default(""),
});

export type CreateUserGeneralInfoSchemaType = z.infer<typeof generalInfoSchema>;

export const createUserSchema = generalInfoSchema.safeExtend({
  assignables: assignablesSchema,
  loginData: loginInfoSchema.default({
    userEmail: "",
    userPassword: "",
  }),
});

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
