import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';


@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

//   async getProductsService() {
//     return await this.productsRepository.getProducts();
//   }
async getProductsService(page: number, limit: number): Promise<Product[]> {
        return this.productsRepository.getProducts(page, limit);
      }
////////////////////////////////////////////



  getProduct(id: string) {
    return this.productsRepository.getProduct(id);
  }

  addProduct(newProduct: Product) {
    return this.productsRepository.addProduct(newProduct);
  }

  updateProduct(id: string, updateProduct: Product) {
    return this.productsRepository.updateProduct(id, updateProduct);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }

  seedProducts(){
    return this.productsRepository.seedproducts();
  }
}
