import z from "zod";
import { loginInfoSchema } from "./login.schema";
import { assignablesSchema } from "./assignables.schema";
import { zId } from "@/lib/base-schemas";

export const baseInfoSchema = z.object({
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

  role: zId,
});

export type CreateUserBaseInfoSchemaType = z.infer<typeof baseInfoSchema>;

export const createUserSchema = baseInfoSchema.safeExtend({
  assignables: assignablesSchema,
  loginData: loginInfoSchema.default({
    userEmail: "",
    userPassword: "",
  }),
});

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
