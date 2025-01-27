import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/entities/products.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  // @Get()
  // async getProducts():Promise<Products[]> {
    //   return await this.productsService.getProductsService();
    // }
    @Get('seeder')
    seedProduct() {
      return this.productsService.seedProducts();
    }

  @Get()
  async getProducts(
    @Query('page') page: string = '1', // Página por defecto es 1
    @Query('limit') limit: string = '5', // Límite por defecto es 5
  ): Promise<Product[]> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return await this.productsService.getProductsService(
      pageNumber,
      limitNumber,
    );
  }
  /////////////////////////

  @Get(':id')
  getProduct(
    @Param('id')
    productId: string,
  ) {
    return this.productsService.getProduct(productId);
  }

  @Post()
  @UseGuards(AuthGuard)
  addProduct(@Body() product: Product) {
    return this.productsService.addProduct(product);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: Product) {
    return this.productsService.updateProduct(id, product);
  }

  // @Delete(':id')
  // deleteProduct(
  //   @Param('id')
  //   id:string
  // ,){
  //   return this.productsService.deleteProduct(`el producto con id : ${id} fue eliminado exitosamente!`)
  // }
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: string): Promise<string> {
    return await this.productsService.deleteProduct(id);
  }

}
