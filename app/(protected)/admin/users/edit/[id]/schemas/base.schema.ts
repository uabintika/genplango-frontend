import z from "zod";
import { generalInfoSchema } from "../../../create/schemas/base.schema";
import { editUserLoginSchema } from "./login.schema";

export const editUserSchema = z.object({
  ...generalInfoSchema.shape,
  role: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .nullish()
    .transform((v) => v ?? "")
    .default(""),

  loginData: editUserLoginSchema.default({
    userEmail: "",
    userPassword: "",
  }),
});

export type EditUserSchemaType = z.infer<typeof editUserSchema>;
