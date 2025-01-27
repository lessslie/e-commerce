import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/entities/users.entity';



@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  
  async getUsersService() {
    return await this.usersRepository.getUsers();
  }
  getUserById(id:string){
    return this.usersRepository.getUserById(id);
  }

  createUser(newUser:User){
    return this.usersRepository.createUser(newUser);
  }




  updateUser(id:string,updateUser:User){
    return this.usersRepository.updateUser(id,updateUser);
  }

  deleteUser(id:string){
    return this.usersRepository.deleteUser(id);
  }












}