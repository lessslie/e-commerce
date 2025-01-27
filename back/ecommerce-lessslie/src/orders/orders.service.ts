import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { Product } from "../entities/products.entity";


@Injectable()
export class OrdersService{
    [x: string]: any;
    constructor(
        private readonly ordersRepository: OrdersRepository
    ){}
addOrder(userId: string, products: Partial<Product>[]){
    return this.ordersRepository.addOrder(userId, products)
}


async getOrders() {
    return this.ordersRepository.getOrders();
  }
  
getOrder(id: string){
    return this.ordersRepository.getOrder(id);
}


}