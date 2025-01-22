import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { IProducts } from './products.interface';


@Injectable ()


export class ProductsService {
    constructor(private productsRepository: ProductsRepository){}
    getProducts(page?: string, limit?: string){
        return this.productsRepository.getProducts(page, limit);
    }
    getProduct(id: string){
        return this.productsRepository.getProduct(id);
    }

    addProduct(newProduct:IProducts){
        return this.productsRepository.addProduct(newProduct);
    }

    updateProduct(id: string, updatedProduct: IProducts){
        return this.productsRepository.upDateProduct(id, updatedProduct);
    }

    deleteProduct(id: string){
        return this.productsRepository.deleteProduct(id);
    }
}