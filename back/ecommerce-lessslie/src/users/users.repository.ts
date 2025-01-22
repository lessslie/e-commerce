import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';

@Injectable()
export class UsersRepository {
  findEmail(email: string) {
    return this.users.find((user)=> user.email === email);
  }
  // findEmail(email: string) {
  //     throw new Error('Method not implemented.');
  // }
  private users: IUser[] = [
    {
      id: 1,
      email: 'juan.perez@example.com',
      name: 'Juan',
      password: 'contraseña123',
      address: 'Av. Corrientes 1234, Buenos Aires',
      phone: 1112345678,
      country: 'Argentina',
      city: 'Buenos Aires',
    },
    {
      id: 2,
      email: 'maria.gonzalez@example.com',
      name: 'María',
      password: 'segura123',
      address: 'Calle Falsa 456, Córdoba',
      phone: 351 - 5678 - 1234,
      country: 'Argentina',
      city: 'Córdoba',
    },
    {
      id: 3,
      email: 'pedro.martinez@example.com',
      name: 'Pedro',
      password: 'miContraseña',
      address: 'Av. Libertador 789, Mendoza',
      phone: 261 - 8765 - 4321,
      country: 'Argentina',
      city: 'Mendoza',
    },
    {
      id: 4,
      email: 'lucia.rodriguez@example.com',
      name: 'Lucia',
      password: 'lucia123',
      address: 'Calle San Martín 321, Rosario',
      phone: 341 - 4321 - 8765,
      country: 'Argentina',
      city: 'Rosario',
    },
    {
      id: 5,
      email: 'jose.sanchez@example.com',
      name: 'Jose',
      password: 'jose123',
      address: 'Av. Rivadavia 654, La Plata',
      phone: 221 - 9876 - 5432,
      country: 'Argentina',
      city: 'La Plata',
    },
  ];

  async getUsers(
    page:string,
    limit:string
  ): Promise<Omit<IUser, 'password'>[]> {
    const userWithoutPass = this.users.map((user) => {
      const { password, ...cleanUser } = user;
      return cleanUser;
    });
    return userWithoutPass;
  }

  async getById(id: string): Promise<Omit<IUser, 'password'>> {
    const foundUser = this.users.find((user) => user.id === Number(id));

    if (!foundUser) throw new Error(`El usuario de id ${id} no fue econtrado`);
    const { password, ...userWithoutPassword } = foundUser;

    return userWithoutPassword;
  }

  async getByName(name: string): Promise<IUser> {
    return this.users.find((user) => user.name === name);
  }

  async createUser(user: IUser): Promise<number> {
    this.users.push(user);
    return user.id;
  }

  async upDateUser(id: string, user: IUser): Promise<number> {
    this.users = this.users.map((previusUser) => {
      if (previusUser.id === Number(id)) {
        return user;
      } else {
        return previusUser;
      }
    });
    return user.id;
  }

  async deleteUser(id: string): Promise<number> {
    this.users = this.users.filter((user) => user.id !== Number(id));
    return Number(id);
  }




}
