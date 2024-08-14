import { Request, Response } from "express";
import { ProductService } from "./product.service";

export class productController {
  private readonly productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }
  createProduct = async (req: Request, res: Response) => {
    const data = req.body;
    const tags = req.body.tags.join(",");
    const product = await this.productService.createProductService(data, tags);
    res.json(product);
  };
}
