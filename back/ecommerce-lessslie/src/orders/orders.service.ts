import { Injectable } from "@nestjs/common";
import { Product } from "entities/products.entity";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService{
    constructor(
        private readonly ordersRepository: OrdersRepository
    ){}
addOrder(userId: string, products: Partial<Product>[]){
    return this.ordersRepository.addOrder(userId, products)
}

getOrder(id: string){
    return this.ordersRepository.getOrder(id);
}


}