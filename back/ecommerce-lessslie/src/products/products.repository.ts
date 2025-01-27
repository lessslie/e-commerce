
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Product } from 'src/entities/products.entity';
import { preload } from 'src/helpers/preload';

import { Repository } from 'typeorm';



interface PreloadProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}



@Injectable()
export class ProductsRepository {

  constructor(
@InjectRepository(Product)
private productsRepository: Repository<Product>,
@InjectRepository(Category)
private categoriesRepository : Repository<Category>
  ){}
 
  async getProducts(page: number, limit: number): Promise<Product[]> {
    console.log('Requesting products with page:', page, 'limit:', limit);
    
    const [products, total] = await this.productsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit
    });
  
    if (total === 0) {
      console.log('No products found in database');
      return [];
    }
  
    console.log(`Found ${total} products`);
    return products;
  }
  //   async getProducts(): Promise<Product[]> {
  //     return this.products;
  //   }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  async updateProduct(id: string, product: Product): Promise<string> {
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    if (!updatedProduct) {
      throw new Error('Producto no encontrado');
    }
    await this.productsRepository.update(id, product);
    return updatedProduct.id; // Ahora es seguro acceder a updatedProduct.id
  }

  async addProduct(product: Product): Promise<string> {
const newProduct = await this.productsRepository.save(product)
    return newProduct.id;
  }

  async deleteProduct(id: string): Promise<string> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    await this.productsRepository.remove(product); // Asegúrate de esperar la eliminación
  
    return product.id; // Cambia this.product.id a product.id
  }

  async seedproducts(): Promise<string> {
    try {
      console.log('Starting seed process');
      const categories = await this.categoriesRepository.find();
      console.log('Found categories:', categories);
  
      if (categories.length === 0) {
        throw new Error('No hay categorías disponibles para asignar a los productos');
      }
  
      for (const element of preload) {
        console.log('Processing product:', element);
        
        const productCategory = categories.find(
          (category) => category.name === element.category
        );
  
        if (!productCategory) {
          console.log(`Categoría no encontrada: ${element.category}`);
          continue; // Skip this product instead of throwing error
        }
  
        const product = new Product();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = productCategory;
  
        console.log('Saving product:', product);
  
        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values(product)
          .orUpdate(['description', 'price', 'stock'], ['name'])
          .execute();
      }
  
      return 'Products added successfully';
    } catch (error) {
      console.error('Error in seedproducts:', error);
      throw new Error(`Error seeding products: ${error.message}`);
    }
  }}
