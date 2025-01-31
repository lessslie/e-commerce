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
  ParseUUIDPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/entities/products.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateProductDto } from 'src/dtos/orders.dto';
import { CreateProductDto } from 'src/dtos/products.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Products')
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
  async getProduct(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.productsService.getProduct(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
   }
@ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  addProduct(@Body() productDto: CreateProductDto) {
    return this.productsService.addProduct(productDto);
  }
  @ApiBearerAuth()
 @Put(':id')
 @Roles(Role.Admin)
 @UseGuards(AuthGuard, RolesGuard)
 async updateProduct(
   @Param('id', ParseUUIDPipe) id: string,
   @Body() updateData: UpdateProductDto,
 ) {
   console.log('Datos recibidos en controlador:', updateData);
   try {
     const result = await this.productsService.updateProduct(id, updateData);
     return { 
       success: true, 
       id: result,
       message: 'Producto actualizado exitosamente'
     };
   } catch (error) {
     throw new BadRequestException(error.message);
   }
 }
 @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.productsService.deleteProduct(id);
   }
}
