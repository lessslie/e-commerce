import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
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
      // Si es una HttpException, mantener el mensaje original
      if (error instanceof HttpException) {
        throw error;
      }
      
      // Para otros tipos de errores, manejar según el mensaje
      if (error.message.includes('User not found')) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      if (error.message.includes('Product not found')) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }
      
      // Error genérico si no coincide con ninguno de los anteriores
      throw new HttpException('Error al crear la orden', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseGuards(AuthGuard)  // Agregamos el guard
  async getOrders(@Req() request) {  // Agregamos el request para obtener el usuario
      const user = request.user;
      return this.ordersService.getOrders(user.id, user.isAdmin);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getOrder(@Param('id',ParseUUIDPipe) orderId: string) {
    return this.ordersService.getOrder(orderId);
  }
}
