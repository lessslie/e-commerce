import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post()
  addOrder(@Body() order) {
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  getOrder(@Param('id') orderId: string) {
    return this.ordersService.getOrder(orderId);
  }
}
