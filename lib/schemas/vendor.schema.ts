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

  accountHolderName: z
    .string()
    .optional()
    .refine((val) => !val || /^[A-Za-z ]+$/.test(val), {
      message: "Name must contain only alphabets and spaces",
    }),

  accountNumber: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^[1-9]\d{5,18}$/.test(val), {
      message: "Account number must be between 6 to 18 digits and valid",
    }),

  address: z.string().optional(),
  
phoneNumber :z
  .union([
    z
      .string()
      .trim()
      .refine((val) => /^[6-9]\d{9}$/.test(val), {
        message: "Phone number must be 10 digits and start with 6-9",
      }),
    z
      .number()
      .refine((val) => /^[6-9]\d{9}$/.test(String(val)), {
        message: "Phone number must be 10 digits and start with 6-9",
      }),
  ])
  .transform((val) => Number(val)),

alternateNumber : z
  .string()
  .trim()
  .optional()
  .refine((val) => !val || /^\d+$/.test(val), {
    message: "Alternate number must contain only digits",
  })
  .refine((val) => !val || /^[6-9]\d{9}$/.test(val), {
    message: "Alternate number must be 10 digits and start with 6-9",
  }),
  bankName: z
    .string()
    .optional()
    .refine((val) => !val || /^[A-Za-z ]+$/.test(val), {
      message: "Bank name must contain only alphabets and spaces",
    }),

  city: z
    .string()
    .min(1, "City is required")
    .refine((val) => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(val), {
      message: "City can contain only alphabets and single spaces",
    })
    .transform((val) =>
      val
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    ),

  companyName: z
    .string()
    .min(1, "Company name is required")
    .refine((val) => /^[A-Za-z0-9&.,\- ]+$/.test(val), {
      message: "Company name contains invalid characters",
    }),

  country: z
    .string()
    .min(1, "Country is required")
    .refine((val) => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(val), {
      message: "Country can contain only alphabets and single spaces",
    })
    .transform((val) =>
      val
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    ),

  gstNumber: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(
          val
        ),
      {
        message: "Invalid GST number format",
      }
    ),

  ifscCode: z
    .string()
    .optional()
    .transform((val) => val?.toUpperCase())
    .refine((val) => !val || /^[A-Z]{4}0[A-Z0-9]{6}$/.test(val), {
      message: "IFSC must be 11 characters (e.g., SBIN0000001)",
    }),

  name: z
    .string()
    .min(1, "Name is required")
    .refine((val) => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(val), {
      message: "Only letters and single spaces allowed",
    })
    .refine((val) => val.trim().split(" ").length <= 50, {
      message: "Name must not exceed 50 words",
    })
    .transform((val) =>
      val
        .trim()
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    ),

  panNumber: z
    .string()
    .optional()
    .transform((val) => val?.toUpperCase())
    .refine((val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val), {
      message: "PAN must be in format ABCDE1234F",
    }),

  state: z
    .string()
    .min(1, "State is required")
    .refine((val) => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(val), {
      message: "State can contain only alphabets and single spaces",
    })
    .transform((val) =>
      val
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    ),
});

export type Vendor = z.infer<typeof vendorSchema>;
