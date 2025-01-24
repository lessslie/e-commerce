import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(
    page: string,
    limit: string,
  ): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();

    const userWithoutPass = users.map((user) => {
      const { password, ...cleanUser } = user;
      return cleanUser;
    });
    return userWithoutPass;
  }

  async getById(id: string): Promise<Omit<User, 'password'>> {
    const foundUser = await this.userRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!foundUser) throw new Error(`El usuario de id ${id} no fue econtrado`);

    const { password, ...userWithoutPassword } = foundUser;

    return userWithoutPassword;
  }

  async createUser(user: User): Promise<string> {
    const newUser = await this.userRepository.save(user);
    return newUser.id;
  }

  async upDateUser(id: string, user: User): Promise<string> {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOneBy({ id });
    return updatedUser.id;
  }

  async deleteUser(id: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    this.userRepository.remove(user);
    return `El usuarion con id:${user.id} eliminado exitosamente`;
  }

  async findEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // async getByName(name: string): Promise<User> {
  //   return this.users.find((user) => user.name === name);
  // }
}
