import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

export const AddressSchema = z.object({
  lineOne: z.string().min(2).max(100),
  lineTwo: z.string().nullable(),
  pincode: z.string().min(6).max(6),
  country: z.string().min(2).max(50),
  city: z.string().min(2).max(50),
});

export const updateUserSchema = z.object({
  // name: z.string().optional(),
  defaultShippingAddresses: z.number(),
  defaultBillingAddresses: z.number(),
});
