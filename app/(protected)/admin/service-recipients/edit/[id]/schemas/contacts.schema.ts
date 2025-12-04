import { zId } from "@/lib/base-schemas";
import { contactSchema as createContactSchema } from "../../../create/schemas/contacts.schema";
import z from "zod";

export const contactSchema = createContactSchema.extend({
  id: zId,
});

export type Contact = z.infer<typeof contactSchema>;
