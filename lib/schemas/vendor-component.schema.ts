import { z } from "zod";

export const vendorComponentSchema = z.object({
  componentId: z.coerce.number().min(1, "Select a Component."),
  vendorId: z.coerce.number().min(1, "Select a Vendor."),
  unitPrice: z.coerce
  .number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  })
  .positive("Price must be greater than zero"),
  deliveryTimeInDays: z.coerce
  .number({
    required_error: "Delivery Time is required",
    invalid_type_error: "Delivery Time be a number",
  })
  .positive("Delivery Time must be greater than zero")
  .transform((val)=> val.toString()),
});
export type VendorComponent = z.infer<typeof vendorComponentSchema>;
