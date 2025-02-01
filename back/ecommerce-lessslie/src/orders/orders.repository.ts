import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from '../entities/orderDetails.entity';
import { Order } from '../entities/orders.entity';
import { Product } from '../entities/products.entity';
import { User } from '../entities/users.entity';

import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  
 
 

  async getOrders(userId?: string, isAdmin?: boolean): Promise<Order[]> {
    if (isAdmin) {
        // Si es admin, retorna todas las órdenes
        return this.ordersRepository.find({
            relations: {
                user: true,
                orderDetails: {
                    products: true,
                },
            },
        });
    } else {
        // Si es usuario normal, solo sus órdenes
        return this.ordersRepository.find({
            where: { user: { id: userId } },
            relations: {
                user: true,
                orderDetails: {
                    products: true,
                },
            },
        });
    }
}

  async getOrder(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
    if (!order) throw new Error(`No se encontro ninguna orden para ese id`);
    return order;
  }

  async addOrder(userId: string, products: Partial<Product>[]): Promise<Order> {
    let totalPrice = 0;
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`User not found`);
    }

    const order = new Order();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    const productsArray: Product[] = await Promise.all(
      products.map(async (product) => {
        // Primero buscar el producto sin la condición de stock
        const existingproduct = await this.productRepository.findOneBy({
          id: product.id
        });
    
        if (!existingproduct) {
          throw new Error(`Product ${product.id} not found`);
        }

        // Luego validar el stock
    if (existingproduct.stock < 1) {
      throw new HttpException(
        `No hay stock suficiente del producto "${existingproduct.name}". Stock actual: ${existingproduct.stock}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    totalPrice = Number(
      (totalPrice + Number(existingproduct.price)).toFixed(2),
    );

    await this.productRepository.update(
      { id: product.id },
      { stock: existingproduct.stock - 1 },
    );
    return existingproduct;
  }),
);

    const orderDetail = new OrderDetail();

    orderDetail.price = totalPrice;
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
    await this.orderDetailsRepository.save(orderDetail);

    return await this.ordersRepository
      .findOne({
        where: { id: newOrder.id },
        relations: {
          orderDetails: true,
        },
      })
      .then((order) => {
        if (!order) throw new Error(`No se encontró la orden recién creada`);
        return order;
      });
  }
}
