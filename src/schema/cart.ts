import { z } from "zod";

export const createCartSchema = z.object({
  userId: z.number().optional(),
  productId: z.number(),
  quantity: z.number(),
});

export const changeQuantitySchema = z.object({
  quantity: z.number(),
});
