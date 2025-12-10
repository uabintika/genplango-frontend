import { zId } from "@/lib/base-schemas";
import z from "zod";

const baseAssignablesSchema = z
  .object({
    municipalityId: zId.nullish(),
    serviceRecipients: z.array(zId).optional(),
    workers: z.array(zId).optional(),
  })
  .default({});

export const assignablesSchema = z.array(baseAssignablesSchema).optional();

export type AssignablesSchemaType = z.infer<typeof assignablesSchema>;
