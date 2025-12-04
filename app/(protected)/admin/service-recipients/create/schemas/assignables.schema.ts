import z from "zod";

export const assignablesSchema = z
  .object({
    coordinators: z.array(z.number()).optional(),
    workers: z.array(z.number()).optional(),
  })
  .default({});
