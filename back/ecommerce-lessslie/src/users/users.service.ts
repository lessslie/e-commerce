import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'entities/users.entity';


@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    @Inject('API_USERS') private apiUsers: User[],
  ) {}

  async getUsers(page: string, limit: string) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id) {
    return this.usersRepository.getById(id);
  }

  // getUserByName(name: string) {
  //   return this.usersRepository.getByName(name);
  // }

  createUser(newuser: User) {
    return this.usersRepository.createUser(newuser);
  }

  upDateUser(id: string, updatedUser: User) {
    return this.usersRepository.upDateUser(id, updatedUser);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
