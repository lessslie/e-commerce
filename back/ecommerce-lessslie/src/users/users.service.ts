import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    @Inject('API_USERS') private apiUsers: IUser[],
  ) {}

  async getUsers(page: string, limit: string) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id) {
    return this.usersRepository.getById(id);
  }

  getUserByName(name: string) {
    return this.usersRepository.getByName(name);
  }

  createUser(newuser: IUser) {
    return this.usersRepository.createUser(newuser);
  }

  upDateUser(id: string, updatedUser: IUser) {
    return this.usersRepository.upDateUser(id, updatedUser);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
