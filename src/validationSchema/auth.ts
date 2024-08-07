import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Invalid Email",
    })
    .email({ message: "Invalid email address" }),
  firstName: z.string({
    invalid_type_error: "Invalid First Name",
    required_error: "First Name is required",
  }),
  lastName: z.string({
    invalid_type_error: "Invalid First Name",
    required_error: "First Name is required",
  }),
  password: z.string({
    invalid_type_error: "Invalid Password",
    required_error: "Password is required",
  }),
});
export const loginSchema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
  password: z.string({
    invalid_type_error: "Invalid Password",
    required_error: "Password is required",
  }),
});
