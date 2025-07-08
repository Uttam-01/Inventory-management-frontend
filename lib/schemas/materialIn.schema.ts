import { z } from "zod";

export const materialInSchema = z.object({
  vendorId: z.coerce.number().min(1, "Vendor ID is required"),
  componentId: z.coerce.number().min(1, "Component ID is required"),

  quantity: z.coerce.number()
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than zero"),

  unitPrice: z.coerce.number()
    .nonnegative("Unit price must be zero or positive"),

  gstPercentage: z.coerce.number()
    .min(0, "GST cannot be negative")
    .max(100, "GST cannot exceed 100"),

  transportCharge: z.coerce.number()
    .nonnegative("Transport charge must be zero or positive"),

  packingCharges: z.coerce.number()
    .nonnegative("Packing charge must be zero or positive"),

  billNo: z.coerce.number()
    .int("Bill number must be an integer")
    .positive("Bill number must be positive"),

  remarks: z.string().optional().nullable(),
});

export type MaterialIn = z.infer<typeof materialInSchema>;
