import { Product } from "@prisma/client";
import { BadRequestsException } from "../../utils/ApiError";
import { ProductRepository } from "./product.repository";

export class ProductService {
  private readonly productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }
  createProductService = async (data: Product, tags: string) => {
    const productNameExists =
      await this.productRepository.checkIfProductNameExistsRepository(
        data.name
      );
    if (productNameExists) {
      throw new BadRequestsException(
        "The product name already exitst, switch to another name"
      );
    }
    return await this.productRepository.createProductRepository(data, tags);
  };
}
