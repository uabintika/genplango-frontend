import z from "zod";
import { loginInfoSchema } from "../../../create/schemas/login.schema";

export const editWorkerLoginSchema = z.object({
  ...loginInfoSchema.shape,
  workerPassword: z
    .string()
    .optional()
    .transform((v) => v ?? ""),
});
