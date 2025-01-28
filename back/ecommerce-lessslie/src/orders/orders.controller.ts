import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dtos/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  // @Post()
  // addOrder(@Body() order: CreateOrderDto) {
  //   const { userId, products } = order;
  //   return this.ordersService.addOrder(userId, products);
  // }

  @Post()
async createOrder(@Body() createOrderDto: CreateOrderDto) {
  try {
    return await this.ordersService.addOrder(createOrderDto.userId, createOrderDto.products);
  } catch (error) {
    if (error.message.includes('User not found')) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    if (error.message.includes('Product not found')) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
    if (error.message.includes('No hay stock')) {
      throw new HttpException('No hay stock suficiente', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Error al crear la orden', HttpStatus.BAD_REQUEST);
  }
}

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  getOrder(@Param('id',ParseUUIDPipe) orderId: string) {
    return this.ordersService.getOrder(orderId);
  }
}
