import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/entities/users.entity';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  async getUsers(): Promise<Omit<User, 'password'>[]> {
    return await this.usersService.getUsersService();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() user: User) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(
    @Param('id')
    id: string,
  ) {
    return this.usersService.deleteUser(
      `el usuario con id : ${id} fue eliminado exitosamente!`,
    );
  }
}
