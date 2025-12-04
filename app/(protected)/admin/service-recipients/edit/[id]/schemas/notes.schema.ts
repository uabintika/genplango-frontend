import z from "zod";

export const noteSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Šis laukelis yra privalomas" })
    .default(""),
  //   type: z
  //     .string()
  //     .transform((v) => v.toString())
  //     .refine((v) => v.length > 0 && !isNaN(Number(v)), {
  //       message: "Šis laukelis yra privalomas",
  //     })
  //     .default(""),
});

export type NoteSchemaType = z.infer<typeof noteSchema>;
