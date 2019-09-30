import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { UsersService } from './users.service';

import { IUser, UserDto } from '@models/user.models';
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

  @Get(':userName')
  public getUserByUserName(@Param('userName') userName: string): Promise<IUser> {
    return this.usersService.getUserByUserName(userName);
  }

  @Post()
  public createUser(@Body() userData: UserDto): Promise<SqlResponce> {
    return this.usersService.createUser(userData);
  }
}
