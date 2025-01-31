// src/dtos/users.dto.ts
import { IsString, IsEmail, IsNotEmpty, Length, Matches,
  IsNumber, IsOptional, MinLength, IsEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsEmail({}, { message: 'El formato del email no es válido' })
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
    message: 'La contraseña debe contener al menos: una letra minúscula, una letra mayúscula, un número y un carácter especial 🧐',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres' })
  address: string;

  @IsNumber({}, { message: 'El teléfono debe ser un número válido' })
  @IsNotEmpty()
  phone: number;

  @IsEmpty()
  isAdmin?: boolean;

  @IsString()
  @IsOptional()
  @Length(2, 50, { message: 'El país debe tener entre 2 y 50 caracteres' })
  @Transform(({ value }) => value?.trim())
  country?: string;

  @IsString()
  @IsOptional()
  @Length(2, 50, { message: 'La ciudad debe tener entre 2 y 50 caracteres' })
  @Transform(({ value }) => value?.trim())
  city?: string;
}