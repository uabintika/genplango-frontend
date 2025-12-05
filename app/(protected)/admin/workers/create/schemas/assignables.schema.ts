import z from "zod";

export const assignablesSchema = z
  .object({
    serviceRecipients: z.array(z.number()).optional(),
    coordinators: z.array(z.number()).optional(),
  })
  .default({});
