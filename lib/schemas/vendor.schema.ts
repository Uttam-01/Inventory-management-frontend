import { z } from "zod";

export const vendorSchema = z.object({
  aadhaarNumber: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^\d{12}$/.test(val), {
      message: "Aadhaar must be a 12-digit number",
    }),
  remarks: z
    .string()
    .max(200, "Remarks can be of max. 200 characters.")
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
  accountHolderName: z.string().optional(),
  accountNumber: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^[1-9]\d*$/.test(val), {
      message: "Account number must be a valid positive number",
    }),
  address: z.string().optional(),
  alternateNumber: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^[6-9]\d{9}$/.test(val), {
      message: "Phone number must be 10 digits and start with 6-9",
    })
    .transform((val) => (val ? Number(val) : undefined)),
  bankName: z.string().optional(),
  city: z
    .string()
    .min(1, "City is required")
    .transform((val) =>
      val
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    ),
  companyName: z.string().min(1, "Company name is required"),
  country: z
    .string()
    .min(1, "Country is required")
    .transform((val) =>
      val
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    ),
  gstNumber: z
    .string()
    .min(1, "GST Number is must.")
    .transform((val) => val.toUpperCase()),
  ifscCode: z
    .string()
    .transform((val) => val.toUpperCase())
    .optional(),
  name: z
    .string()
    .min(1, "Name is required")
    .refine((val) => /^[A-Za-z ]+$/, {
      message: "Name must contain only alphabets and spaces",
    })
    .transform((val) =>
      val
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    ),
  panNumber: z
    .string()
    .transform((val) => val.toUpperCase())
    .optional(),
  phoneNumber: z.coerce
    .number()
    .int()
    .refine((val) => /^[6-9]\d{9}$/.test(String(val)), {
      message: "Phone number must be 10 digits and start with 6-9",
    }),

  state: z
    .string()
    .min(1, "State is required")
    .transform((val) =>
      val
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    ),
});
export type Vendor = z.infer<typeof vendorSchema>;
