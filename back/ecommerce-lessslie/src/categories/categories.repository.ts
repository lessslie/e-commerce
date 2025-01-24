import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'entities/categories.entity';
import { Repository } from 'typeorm';
import { preload } from '../helpers/preload';

//     {
//       name: 'Iphone 15',
//       description: 'The best smartphone in the world',
//       price: 199.99,
//       stock: 12,
//       category: 'smartphone',
//     },
//     {
//       name: 'Samsung Galaxy S23',
//       description: 'The best smartphone in the world',
//       price: 150.0,
//       stock: 12,
//       category: 'smartphone',
//     },
//     {
//       name: 'Motorola Edge 40',
//       description: 'The best smartphone in the world',
//       price: 179.89,
//       stock: 12,
//       category: 'smartphone',
//     },
//     {
//       name: 'Samsung Odyssey G9',
//       description: 'The best monitor in the world',
//       price: 299.99,
//       stock: 12,
//       category: 'monitor',
//     },
//     {
//       name: 'LG UltraGear',
//       description: 'The best monitor in the world',
//       price: 199.99,
//       stock: 12,
//       category: 'monitor',
//     },
//     {
//       name: 'Acer Predator',
//       description: 'The best monitor in the world',
//       price: 150.0,
//       stock: 12,
//       category: 'monitor',
//     },
//     {
//       name: 'Razer BlackWidow V3',
//       description: 'The best keyboard in the world',
//       price: 99.99,
//       stock: 12,
//       category: 'keyboard',
//     },
//     {
//       name: 'Corsair K70',
//       description: 'The best keyboard in the world',
//       price: 79.99,
//       stock: 12,
//       category: 'keyboard',
//     },
//     {
//       name: 'Logitech G Pro',
//       description: 'The best keyboard in the world',
//       price: 59.99,
//       stock: 12,
//       category: 'keyboard',
//     },
//     {
//       name: 'Razer Viper',
//       description: 'The best mouse in the world',
//       price: 49.99,
//       stock: 12,
//       category: 'mouse',
//     },
//     {
//       name: 'Logitech G502 Pro',
//       description: 'The best mouse in the world',
//       price: 39.99,
//       stock: 12,
//       category: 'mouse',
//     },
//     {
//       name: 'SteelSeries Rival 3',
//       description: 'The best mouse in the world',
//       price: 29.99,
//       stock: 12,
//       category: 'mouse',
//     },
//   ];

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async addCategories(): Promise<string> {
    await Promise.all(
      preload?.map(async (element) => {
        await this.categoryRepository
          .createQueryBuilder()
          .insert()
          .into(Category)
          .values({ name: element.category })
          .orIgnore()
          .execute();
      }),
    );
    return 'Categories seeded';
  }
}
