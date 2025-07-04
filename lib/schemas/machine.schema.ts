import { z } from "zod";

export const machineSchema = z.object({
  name: z.string().min(1, "Name is required"),
  model: z.string().min(1, "Model is required"),
  modelNumber: z.string().min(1, "Model number is required"),
  machineCategory: z.string().min(1, "Machine category is required"),

  weight: z
    .union([z.string(), z.number()])
    .transform((val) => (val === "" ? undefined : Number(val)))
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Weight must be a number",
    })
    .optional(),

  price: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Price must be a number" }),

  description: z.string().optional(),

  components: z
    .array(
      z.object({
        componentId: z
          .union([z.string(), z.number()])
          .transform((val) => Number(val))
          .refine((val) => !isNaN(val), { message: "Component ID must be a number" }),

        quantityRequired: z
          .union([z.string(), z.number()])
          .transform((val) => Number(val))
          .refine((val) => val > 0, {
            message: "Quantity must be greater than 0",
          }),
      })
    )
    .min(1, "At least one component is required"),
});
export type Machine = z.infer<typeof machineSchema>;
