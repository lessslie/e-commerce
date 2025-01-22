import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProducts } from './products.interface';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<IProducts[]> {
    return this.productsService.getProducts(page, limit);
  }

  @Get(':id')
  getProductById(@Param('id') productId: string) {
    return this.productsService.getProduct(productId);
  }

  @Post()
   @UseGuards(AuthGuard)
  addProduct(@Body() product: IProducts) {
    return this.productsService.addProduct(product);
  }

  @Put(':id')
   @UseGuards(AuthGuard)
  updateProduct(@Param('id') productId: string, @Body() product: IProducts) {
    return this.productsService.updateProduct(productId, product);
  }

  @Delete(':id')
   @UseGuards(AuthGuard)
  deleteProduct(@Param('id') productId: string) {
    return this.productsService.deleteProduct(productId);
  }
}
