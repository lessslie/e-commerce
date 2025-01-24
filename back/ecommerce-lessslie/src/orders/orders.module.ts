import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetail } from "entities/orderDetails.entity";
import { Order } from "entities/orders.entity";
import { Product } from "entities/products.entity";
import { User } from "entities/users.entity";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { OrdersController } from "./orders.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature([OrderDetail,
            Order,
            Product,
            User])
    ],
    providers: [OrdersService,OrdersRepository],
    controllers: [OrdersController]
})

export class OrdersModule{}