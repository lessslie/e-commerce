import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  IsUUID,
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
