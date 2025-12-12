import { zRequiredString, zId } from "@/lib/base-schemas";
import z from "zod";

export const contactSchema = z.object({
  firstName: zRequiredString,
  lastName: zRequiredString,
  kinshipRelationId: zId.default(""),
  phoneNumber: zRequiredString,
  isDefault: z.boolean().default(false),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;
