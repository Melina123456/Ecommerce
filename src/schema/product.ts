import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(6).max(100),
  price: z.number(),
  tags: z.string(),
});
