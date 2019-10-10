import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';

import { AuthService } from './auth/auth.service';

import { ITokenObject, IUserReq, LoginDto } from './models/auth.models';
import { SqlResponce } from './models/response.models';
import { UserDto } from './models/user.models';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AuthGuard('local'))
  @ApiUseTags('login')
  @Post('login')
  @ApiImplicitBody({
    name: 'LoginDto',
    description: 'Login model',
    type: LoginDto,
  })
  public async login(@Request() req: IUserReq): Promise<ITokenObject> {
    return this.authService.login(req.user);
  }

  @ApiUseTags('logout')
  @Post('logout')
  public logout(@Body() user: UserDto): Promise<SqlResponce> {
    return this.authService.logout(user);
  }
}
