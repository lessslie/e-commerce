import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dtos/orders.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

@ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
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
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getOrder(@Param('id',ParseUUIDPipe) orderId: string) {
    return this.ordersService.getOrder(orderId);
  }
}
