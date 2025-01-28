// /* eslint-disable @typescript-eslint/require-await */
// import { Injectable } from '@nestjs/common';
// import { UsersRepository } from 'src/users/users.repository';

// @Injectable()
// export class AuthService {
//   constructor(private readonly usersRepository: UsersRepository) {}

//   async getAuthLogin(auth: { email: string; password: string }) {
//     const { email, password } = auth;
//     const user =  this.usersRepository.findEmail(email);
//     if (!user) {
//       return 'Email o password incorrectos';
//     }
//     if (user.password !== password) {
//       return 'Email o password incorrectos';
//     }

//     return 'Sesion iniciada exitosamente!';
//   }
// }


import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';


@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAuthLogin(auth: { email: string; password: string }){
    const { email, password } = auth;
    
    // Usa await para obtener el usuario
    const user: User | null = await this.usersRepository.findEmail(email);
    
    if (!user) {
      return 'Email o password incorrectos 🤔 ​';
    }
    
    if (user.password !== password) {
      return 'Email o password incorrectos ​🤔 ​';
    }

    return 'Sesión iniciada exitosamente!🤗 ​';
  }
}