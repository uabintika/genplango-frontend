import { zId } from "@/lib/base-schemas";
import z from "zod";

export const contactsSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .default(""),
  lastName: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .default(""),
  kinshipRelationId: zId.default(""),
  phoneNumber: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .default(""),
  isDefault: z.boolean().default(false),
});
