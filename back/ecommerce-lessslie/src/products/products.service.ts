import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';
import { UpdateProductDto } from 'src/dtos/orders.dto';


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

  async updateProduct(id: string, updateData: UpdateProductDto) {
    try {
      return await this.productsRepository.updateProduct(id, updateData);
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }

  seedProducts(){
    return this.productsRepository.seedproducts();
  }
}
