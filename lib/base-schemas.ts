import z from "zod";

export const zId = z
  .union([z.string(), z.number()])
  .transform((v) => v.toString())
  .refine((v) => v.length > 0 && !isNaN(Number(v)), {
    message: "Šis laukelis yra privalomas",
  })
  .default("");

export const zRequiredString = z
  .string()
  .min(1, { error: "Šis laukelis yra privalomas" })
  .default("");
