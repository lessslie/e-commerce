import { Injectable } from '@nestjs/common';
import { preload } from 'helpers/preload';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'entities/categories.entity';
import { Product } from 'entities/products.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getProducts(page: string, limit: string): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product  not found`);
    }
    return product;
  }

  async addProduct(product: Product): Promise<string> {
    const newProduct = await this.productsRepository.save(product);
    return newProduct.id;
  }

  async upDateProduct(id: string, product: Product): Promise<string> {
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    return updatedProduct.id;
  }

  async deleteProduct(id: string): Promise<string> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new Error(`Product not found`);
    }
    this.productsRepository.remove(product);

    return `El producto con el id ${product.id} se ha eliminado`;
  }

  async seedProducts() {
    const categories = await this.categoryRepository.find();

    await Promise.all(
      preload?.map(async (element) => {
        const productCategory = categories.find(
          (category) => category.name === element.category,
        );

        const product = new Product();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = productCategory;

        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values(product)
          .orUpdate(['description', 'price', 'stock'], ['name'])
          .execute();
      }),
    );
    console.log('Products added');
    return 'Products added';
  }
}
