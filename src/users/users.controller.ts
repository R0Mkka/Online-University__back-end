import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';

import { IUser, ISafeUser, UserDto } from '@models/user.models';
import { SqlResponce } from '@models/response.models';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  public getUserList(): Promise<IUser[]> {
    return this.usersService.getUserList();
  }

  @UseGuards(AuthGuard())
  @Get('/me')
  public getCurrentUser(@Request() req): Promise<ISafeUser> {
    return this.usersService.getUserById(req.user.userId);
  }

  @Post()
  public createUser(@Body() userData: UserDto): Promise<SqlResponce> {
    return this.usersService.createUser(userData);
  }
}
