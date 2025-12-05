import z from "zod";

export const noteSchema = z.object({
  description: z
    .string()
    .min(1, { error: "Šis laukelis yra privalomas" })
    .default(""),
  type: z.string().min(1, { error: "Šis laukelis yra privalomas" }).default(""),
  useForAi: z.boolean().default(false),
});

export type NoteSchemaType = z.infer<typeof noteSchema>;

export interface ListNote extends NoteSchemaType {
  id: number;
}
