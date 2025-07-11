import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string({
      required_error: "Full name is required.",
    }).min(1,"Full name is required.")
    .max(25, "Full name must be 25 characters or fewer.")
    .trim(),

  phoneNumber: z
    .string({
      required_error: "Phone number is required.",
    })
    .regex(/^[6-9]\d{9}$/, {
      message: "Phone number must be 10 digits and start with 6, 7, 8, or 9.",
    }),

  email: z
    .string({
      required_error: "Email address is required.",
    })
    .email("Please enter a valid email address."),

  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(6, "Password must be at least 6 characters long."),

  dob: z
    .string({
      required_error: "Date of birth is required.",
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format.")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Please enter a valid date.",
    }),

  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Gender selection is required.",
  }),

  roleName: z
    .array(z.string(), {
      required_error: "At least one role must be assigned.",
    })
    .nonempty("User must be assigned at least one role."),
    status: z.string().optional()
});

export type UserFormData = z.infer<typeof userSchema>;