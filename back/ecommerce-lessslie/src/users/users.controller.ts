import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto } from 'src/dtos/users.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  async getUsers(): Promise<Omit<CreateUserDto, 'password'>[]> {
    return await this.usersService.getUsersService();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id',ParseUUIDPipe) id: string) {
  
    return this.usersService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      if (error?.code === '23505') { // Código PostgreSQL para unique_violation
        throw new HttpException('El email ya está registrado', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error al crear el usuario', HttpStatus.BAD_REQUEST);
    }
  }
  // createUser(@Body() user: CreateUserDto) {
  //   console.log(user);
  //   return this.usersService.createUser(user);
  // }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id',ParseUUIDPipe) id: string, @Body() user: CreateUserDto) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(
    @Param('id',ParseUUIDPipe)
    id: string,
  ) {
    return this.usersService.deleteUser(
      `el usuario con id : ${id} fue eliminado exitosamente!`,
    );
  }
}
