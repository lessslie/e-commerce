import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/users.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Order } from 'entities/orders.entity';
import { OrderDetail } from 'entities/orderDetails.entity';
import { Product } from 'entities/products.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getOrder(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
    if (!order) throw new Error(`Order not found`);
    return order;
  }

  async addOrder(userId: string, products: Partial<Product>[]): Promise<Order> {
    let totalPrice = 0;
    const user = await this.userRepository.findOneBy({ id: userId });
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
        totalPrice += existingproduct.price;

        await this.productRepository.update(
          { id: product.id },
          { stock: existingproduct.stock - 1 },
        );
        return existingproduct;
      }),
    );

    const orderDetail = new OrderDetail();

    orderDetail.price = Number(Number(totalPrice).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;

    await this.orderDetailsRepository.save(orderDetail);

    return await this.ordersRepository.findOne({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }
}
