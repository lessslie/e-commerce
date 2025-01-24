import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from 'entities/products.entity';


@Injectable ()


export class ProductsService {
    constructor(private productsRepository: ProductsRepository){}
    getProducts(page?: string, limit?: string){
        return this.productsRepository.getProducts(page, limit);
    }
    getProduct(id: string){
        return this.productsRepository.getProduct(id);
    }

    addProduct(newProduct:Product){
        return this.productsRepository.addProduct(newProduct);
    }

    updateProduct(id: string, updatedProduct: Product){
        return this.productsRepository.upDateProduct(id, updatedProduct);
    }

    deleteProduct(id: string){
        return this.productsRepository.deleteProduct(id);
    }
    seedProducts(){
        return this.productsRepository.seedProducts();
    }
}