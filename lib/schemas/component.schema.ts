import { z } from "zod";

export const componentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().optional(),
  dimension: z.string().optional(),
//   ({
//     invalid_type_error: "Dimensions must be a string",
//     required_error: "Dimensions are required",
//   }).min(1, "Dimensions are required"),
  availableQuantity: z.coerce.number().int("Quantity should be a number").nonnegative("Quantity should be positive").optional(),
  minimumStock: z.coerce.number().int("Min. Stock should be a number").nonnegative("Min. Stock should be positive").min(1, "Min. Stock is required"),
  locationInStore: z.string().optional(),
  description: z.string().optional(),
  units: z.enum(["KG", "METER", "INCH", "FOOT", "PIECE"]),
});

export type Component = z.infer<typeof componentSchema>;