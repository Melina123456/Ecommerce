import { Decimal } from "@prisma/client/runtime/library";

export interface createProductDto {
  name: string;
  description: string;
  price: Decimal;
}
