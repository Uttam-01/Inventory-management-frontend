import { z } from "zod";
const toTitleCase = (val: string) =>
  val
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const componentSchema = z.object({
  name: z
    .string({
      required_error: "Component name is required",
      invalid_type_error: "Component name must be a string",
    })
    .min(1, "Component name cannot be empty")
    .max(100, "Component name can be at most 100 characters")
    .refine((val) => /^[A-Za-z0-9 ]+$/.test(val), {
      message: "Component name must contain only letters, numbers, and spaces",
    })
    .transform(toTitleCase),

  category: z
    .string({
      required_error: "Category is required",
      invalid_type_error: "Category must be a string",
    })
    .min(1, "Category cannot be empty")
    .max(100, "Category can be at most 100 characters")
    .refine((val) => /^[A-Za-z0-9 ]+$/.test(val), {
      message: "Category must contain only letters, numbers, and spaces",
    })
    .transform(toTitleCase),

  subCategory: z
  .string({
    invalid_type_error: "Sub-category must be a string",
  })
  .max(100, "Sub-category can be at most 100 characters")
  .refine((val) => !val || /^[A-Za-z0-9 ]+$/.test(val), {
    message: "Sub-category must contain only letters, numbers, and spaces",
  })
  .transform((val) => (val ? toTitleCase(val) : val))
  .optional(),


  dimension: z
    .string({
      invalid_type_error: "Dimension must be a string",
    })
    .max(100, "Dimension can be at most 100 characters")
    .optional(),

minimumStock: z.coerce
  .number({
    invalid_type_error: "Minimum stock must be a number",
    required_error: "Minimum stock is required",
  })
  .int("Minimum stock must be an integer")
  .min(1, "Minimum stock must be at least 1")
  .max(999999999, "Minimum stock can't exceed 9 digits"),

availableQuantity: z.coerce
  .number({
    invalid_type_error: "Available quantity must be a number",
    required_error: "Available quantity is required",
  })
  .int("Available quantity must be an integer")
  .nonnegative("Available quantity must be zero or more")
  .max(999999999, "Available quantity can't exceed 9 digits")
  .optional(),

  locationInStore: z
    .string({
      invalid_type_error: "Location must be a string",
    })
    .max(100, "Location can be at most 100 characters")
    .optional(),

  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .max(300, "Description can be at most 300 characters")
    .optional(),

  units: z.enum(["KG", "METER", "INCH", "FOOT", "PIECE"], {
    required_error: "Unit is required",
    invalid_type_error: "Unit must be one of: KG, METER, INCH, FOOT, PIECE",
  }),
});

export type Component = z.infer<typeof componentSchema>;
