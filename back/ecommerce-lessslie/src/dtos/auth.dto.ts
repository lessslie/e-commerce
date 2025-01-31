// src/dtos/auth.dto.ts
import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "./users.dto";
import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

// Mantener el LoginUserDto existente
export class LoginUserDto extends PickType(CreateUserDto, [
    'email',
    'password'
]){}

// Agregar el nuevo SignupUserDto
export class SignupUserDto extends CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(8, 15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
        message: 'La contraseña de confirmación debe contener al menos: una letra minúscula, una letra mayúscula, un número y un carácter especial 🧐',
    })
    passwordConfirm: string;
}