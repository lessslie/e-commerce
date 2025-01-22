import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { request, Request, Response } from 'express';

import { IUser } from './user.interface';
import { profile } from 'console';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<Omit<IUser,'password'>[]> {
    return this.usersService.getUsers(page, limit);

  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    console.log(id);
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(
    @Body()
    user: IUser,
  ) {
    console.log('dentro del endpoint:', user);
    return this.usersService.createUser(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id')
    id: string,
    @Body()
    user: IUser,
  ) {
    return this.usersService.upDateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    console.log("Usuario con id:", id, "eliminado");
    return this.usersService.deleteUser(id);
  }

}
