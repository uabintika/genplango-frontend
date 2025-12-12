import z from "zod";
import { loginInfoSchema } from "./login.schema";
import { assignablesSchema } from "./assignables.schema";
import { zRequiredString } from "@/lib/base-schemas";

export const generalInfoSchema = z.object({
  firstName: zRequiredString,

  lastName: zRequiredString,

  duty: zRequiredString,

  phoneNumber: z
    .string()
    .nullish()
    .transform((v) => v ?? ""),

  role: zRequiredString,
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
