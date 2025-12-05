import z from "zod";
import { assignablesSchema } from "../../../create/schemas/assignables.schema";
import { generalInfoFormSchema } from "../../../create/schemas/base.schema";

export const editServiceRecipientSchema = generalInfoFormSchema.safeExtend({
  assignables: assignablesSchema,
});

export type EditServiceRecipientSchemaType = z.infer<
  typeof editServiceRecipientSchema
>;
