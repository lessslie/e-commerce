import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  IsUUID,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Product } from 'src/entities/products.entity';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Product>[];
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  stock?: number;
}