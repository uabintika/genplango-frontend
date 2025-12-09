import z from "zod";

export const loginInfoSchema = z.object({
  userEmail: z
    .email({ error: "Neteisingas el. pašto formatas" })
    .min(1, "Šis laukelis yra privalomas"),
  userPassword: z.string().min(1, { message: "Šis laukelis yra privalomas" }),
});
