import { Injectable } from '@nestjs/common';
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

  async getOrders(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: {
        user: true,
        orderDetails: {
          products: true,
        },
      },
    });
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
        const existingproduct = await this.productRepository.findOneBy({
          id: product.id,
          stock: MoreThanOrEqual(1),
        });

        if (!existingproduct) {
          throw new Error(`Product ${product.id} not found`);
        }
        if (existingproduct.stock < 1) {
          throw new Error(`No hay stock de ese producto`);
        }
        // totalPrice += existingproduct.price;
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

    // orderDetail.price = Number(Number(totalPrice).toFixed(2));
    // orderDetail.products = productsArray;
    // orderDetail.order = newOrder;
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
