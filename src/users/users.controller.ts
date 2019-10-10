import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { IUser, ISafeUser, UserDto } from '../models/user.models';
import { SqlResponce } from '../models/response.models';
import { IUserReq } from '../models/auth.models';

@ApiUseTags('users')
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
  @ApiBearerAuth()
  @Get('/current')
  public getCurrentUser(@Request() req: IUserReq): Promise<ISafeUser> {
    return this.usersService.getUserById(String(req.user.userId));
  }

  @Post()
  public createUser(@Body() userData: UserDto): Promise<SqlResponce> {
    return this.usersService.createUser(userData);
  }
}
