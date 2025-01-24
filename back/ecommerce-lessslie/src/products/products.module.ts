import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'entities/products.entity';
import { Category } from 'entities/categories.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    controllers : [ProductsController],
    providers: [ProductsService,ProductsRepository],
})
export class ProductsModule{}