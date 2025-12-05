import { KinshipRelation } from "../../../create/_components/general-info-section";
import { contactSchema as createContactSchema } from "../../../create/schemas/contacts.schema";
import z from "zod";

export const contactSchema = createContactSchema.extend({
  id: z.number(),
});

export type Contact = z.infer<typeof contactSchema>;

export interface ListContact extends Contact {
  kinshipRelation: KinshipRelation;
}
