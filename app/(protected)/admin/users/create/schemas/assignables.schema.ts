import { zId } from "@/lib/base-schemas";
import z from "zod";

const baseAssignablesSchema = z
  .object({
    municipalityId: zId.nullish(),
    serviceRecipients: z.array(zId).nullish(),
    workers: z.array(zId).nullish(),
  })
  .refine(
    (item) => {
      const hasRecipients = (item.serviceRecipients?.length ?? 0) > 0;
      const hasWorkers = (item.workers?.length ?? 0) > 0;
      const needsMunicipality = hasRecipients || hasWorkers;

      if (needsMunicipality && !item.municipalityId) return false;
      return true;
    },
    {
      message:
        "municipalityId is required when serviceRecipients or workers contain values.",
      path: ["municipalityId"],
    }
  );

type Assignable = z.infer<typeof baseAssignablesSchema>;

export const assignablesSchema = z
  .record(z.string(), baseAssignablesSchema)
  .nullish()
  .transform((val) => {
    if (!val) return {};

    const cleaned: Record<string, Assignable> = {};

    for (const [key, item] of Object.entries(val)) {
      const hasMunicipality = !!item.municipalityId;
      const hasRecipients = (item.serviceRecipients?.length ?? 0) > 0;
      const hasWorkers = (item.workers?.length ?? 0) > 0;

      if (hasMunicipality || hasRecipients || hasWorkers) {
        cleaned[key] = item;
      }
    }

    return cleaned;
  });

export type AssignablesSchemaType = z.infer<typeof assignablesSchema>;
