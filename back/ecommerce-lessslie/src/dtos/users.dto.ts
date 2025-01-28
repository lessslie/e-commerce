
import { IsString, IsEmail, IsNotEmpty, Length, Matches, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
    message: 'The password must contain at least: a lowercase letter, a capital letter, a number and a special character 🧐',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  address: string;


  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsOptional()
  @Length(5, 20)
  country?: string;

  @IsString()
  @IsOptional()
  @Length(5, 20)
  city?: string;
}