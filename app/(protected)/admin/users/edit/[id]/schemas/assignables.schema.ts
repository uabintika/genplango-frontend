import z from "zod";
import { assignablesSchema } from "../../../create/schemas/assignables.schema";

export const assignablesFormSchema = z.object({
  assignables: assignablesSchema,
});

export type AssignablesFormSchemaType = z.infer<typeof assignablesFormSchema>;
