import { z } from "zod";

// Helper to process number fields (empty strings, coercion, and validation)
const parseNumberField = (
  label: string,
  options: {
    min?: number;
    max?: number;
    int?: boolean;
    positive?: boolean;
    nonnegative?: boolean;
  } = {}
) =>
  z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z
      .number({ required_error: `${label} is required` })
      .refine((val) => !isNaN(val), { message: `${label} must be a number` })
      .refine((val) => options.min === undefined || val >= options.min, {
        message: `${label} must be at least ${options.min}`,
      })
      .refine((val) => options.max === undefined || val <= options.max, {
        message: `${label} must be at most ${options.max}`,
      })
      .refine((val) => !options.positive || val > 0, {
        message: `${label} must be greater than zero`,
      })
      .refine((val) => !options.nonnegative || val >= 0, {
        message: `${label} must be zero or positive`,
      })
      .refine((val) => !options.int || Number.isInteger(val), {
        message: `${label} must be an integer`,
      })
  );

export const materialInSchema = z.object({
  vendorId: parseNumberField("Vendor ID", { min: 1 }),
  componentId: parseNumberField("Component ID", { min: 1 }),

  quantity: parseNumberField("Quantity", { int: true, positive: true }),
  unitPrice: parseNumberField("Unit Price", { nonnegative: true }),
  gstPercentage: parseNumberField("GST %", { min: 0, max: 100 }),
  transportCharge: parseNumberField("Transport Charge", { nonnegative: true }),
  packingCharges: parseNumberField("Packing Charges", { nonnegative: true }),
  billNo: parseNumberField("Bill No", { int: true, positive: true }),

  remarks: z.string().optional().nullable(),
});

// Type inference for usage
export type MaterialIn = z.infer<typeof materialInSchema>;
