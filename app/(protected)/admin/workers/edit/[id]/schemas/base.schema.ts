import z from "zod";
import { generalInfoSchema } from "../../../create/schemas/base.schema";
import { assignablesSchema } from "../../../create/schemas/assignables.schema";
import { loginInfoSchema } from "../../../create/schemas/login.schema";

export const editWorkerSchema = generalInfoSchema.safeExtend({
  loginData: loginInfoSchema,
  assignables: assignablesSchema,
});

export type EditWorkerSchemaType = z.infer<typeof editWorkerSchema>;
