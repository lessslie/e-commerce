// import {
//   BadRequestException,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { LoginUserDto } from 'src/dtos/auth.dto';
// import { CreateUserDto } from 'src/dtos/users.dto';
// import { UsersRepository } from 'src/users/users.repository';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly usersRepository: UsersRepository,
//     private jwtService: JwtService,
//   ) {}

//   async getAuthLogin(auth: { email: string; password: string }) {
//     const { email, password } = auth;

//     // Usa await para obtener el usuario
//     const user = await this.usersRepository.findEmail(email);

//     if (!user) {
//       return 'Email o password incorrectos 🤔 ​';
//     }

//     if (user.password !== password) {
//       return 'Email o password incorrectos ​🤔 ​';
//     }

//     // return 'Sesión iniciada exitosamente!🤗 ​';
//     const payload = {
//       id: user.id,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     };
//     console.log('generated token payload:', payload);
//     const token = this.jwtService.sign(payload);
//     return {
//       token,
//       message: 'Sesión iniciada exitosamente!🤗 ​',
//     };
//   }

//   async signInUser(loginData: LoginUserDto) {
//     console.log('Login attempt:', loginData.email);

//     const user = await this.usersRepository.findEmail(loginData.email);
//     if (!user) {
//       throw new UnauthorizedException('Credenciales inválidas');
//     }

//     console.log('Found user:', user.email);

//     try {
//       const isPasswordValid = await bcrypt.compare(
//         loginData.password,
//         user.password,
//       );

//       console.log('Password valid:', isPasswordValid);

//       if (!isPasswordValid) {
//         throw new UnauthorizedException('Credenciales inválidas');
//       }

//       // Generar JWT
//       const payload = {
//         id: user.id,
//         email: user.email,
//         isAdmin: user.isAdmin,
//       };
//       console.log('Token payload:', payload); // Para debug

//       const token = this.jwtService.sign(payload);

//       // Retornar usuario sin contraseña y token
//       const { password, ...userWithoutPassword } = user;
//       return {
//         user: userWithoutPassword,
//         token,
//         message: 'Sesión iniciada exitosamente! 🤗',
//       };
//     } catch (error) {
//       console.error('Error comparing passwords:', error);
//       throw new UnauthorizedException('Error al validar credenciales');
//     }
//   }

//   async signupUser(user: CreateUserDto) {
//     const existUser = await this.usersRepository.findEmail(user.email);
//     if (existUser) {
//       throw new BadRequestException(
//         'Ya existe un usuario registrado con este correo electrónico.',
//       );
//     }
//     const hashedPassword = await bcrypt.hash(user.password, 10);

//     const newUser = { ...user, password: hashedPassword };
//     const savedUser = await this.usersRepository.createUser(newUser);
//     const { password, ...userWithoutPassword } = savedUser;
//     return userWithoutPassword;
//   }
// }

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/dtos/auth.dto';
import { CreateUserDto } from 'src/dtos/users.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signInUser(loginData: LoginUserDto) {
    console.log('Datos de login recibidos:', {
      email: loginData.email,
      password: loginData.password
    });
  
    const user = await this.usersRepository.findEmail(loginData.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  
    console.log('Usuario encontrado:', {
      email: user.email,
      hashedPassword: user.password // ver el hash almacenado
    });
  
    try {
      const isPasswordValid = await bcrypt.compare(
        loginData.password,
        user.password
      );
  
      console.log('Comparación de contraseñas:', {
        plainPassword: loginData.password,
        hashedPassword: user.password,
        isValid: isPasswordValid
      });
  
      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
  
      const payload = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
      };
  
      const token = this.jwtService.sign(payload);
      const { password, ...userWithoutPassword } = user;
      
      return {
        user: userWithoutPassword,
        token,
        message: 'Sesión iniciada exitosamente! 🤗'
      };
    } catch (error) {
      console.error('Error completo:', error);
      throw error;
    }
  }

  async signupUser(user: CreateUserDto) {
    const existUser = await this.usersRepository.findEmail(user.email);
    if (existUser) {
      throw new BadRequestException(
        'Ya existe un usuario registrado con este correo electrónico.',
      );
    }
  
    console.log('Password antes de hash:', user.password);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log('Password después de hash:', hashedPassword);
  
    const newUser = { ...user, password: hashedPassword };
    const savedUser = await this.usersRepository.createUser(newUser);
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }
}