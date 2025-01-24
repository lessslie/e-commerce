import {Injectable} from '@nestjs/common';
import { UsersRepository } from 'users/users.repository';


@Injectable ()
export class AuthService {
    constructor(
        private readonly usersRepository : UsersRepository){}


    async Login(auth: { email: string; password: string }){
        const{email, password} = auth;
        const user = await this.usersRepository.findEmail(email);
        if(!user){
            return `Email o password incorrectos`;
        }
        if(user.password !== password){
            return `Email o password incorrectos`;
        }
        return `sesion iniciada exitosamente`;
    }

    }
