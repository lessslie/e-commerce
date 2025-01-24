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
import { AuthGuard } from 'guards/auth.guards';
import { Product } from 'entities/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  
  
  @Get()
  getProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<Product[]> {
    return this.productsService.getProducts(page, limit);
  }
  
  @Get('seeder')
  seedProduct() {
    return this.productsService.seedProducts();
  }

  
  @Get(':id')
  getProductById(@Param('id') productId: string) {
    return this.productsService.getProduct(productId);
  }
  
  @Post()
  @UseGuards(AuthGuard)
  addProduct(@Body() product: Product) {
    return this.productsService.addProduct(product);
  }
  
  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') productId: string, @Body() product: Product) {
    return this.productsService.updateProduct(productId, product);
  }
  
  @Delete(':id')
   @UseGuards(AuthGuard)
  deleteProduct(@Param('id') productId: string) {
    return this.productsService.deleteProduct(productId);
  }


}