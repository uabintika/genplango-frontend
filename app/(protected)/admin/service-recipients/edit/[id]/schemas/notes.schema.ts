import { zRequiredString } from "@/lib/base-schemas";
import z from "zod";

export const noteSchema = z.object({
  description: zRequiredString,
  type: zRequiredString,
  useForAi: z.boolean().default(false),
});

export type NoteSchemaType = z.infer<typeof noteSchema>;

export type Authorable = {
  id: number;
  firstName: string;
  lastName: string;
};

export interface ListNote extends NoteSchemaType {
  id: number;
  authorable: Authorable;
}
