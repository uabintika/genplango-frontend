import z from "zod";
import { generalInfoSchema } from "../../../create/schemas/base.schema";
import { assignablesSchema } from "../../../create/schemas/assignables.schema";
import { editWorkerLoginSchema } from "./login.schema";

export const editWorkerSchema = generalInfoSchema.safeExtend({
  assignables: assignablesSchema,
  loginData: editWorkerLoginSchema.default({
    workerEmail: "",
    workerPassword: "",
  }),
});

export type EditWorkerSchemaType = z.infer<typeof editWorkerSchema>;
