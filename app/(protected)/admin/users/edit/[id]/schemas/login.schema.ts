import z from "zod";
import { loginInfoSchema } from "../../../create/schemas/login.schema";

export const editUserLoginSchema = z.object({
  ...loginInfoSchema.shape,
  userPassword: z
    .string()
    .optional()
    .transform((v) => v ?? ""),
});
