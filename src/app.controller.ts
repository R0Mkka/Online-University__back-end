import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth/auth.service';

import { ITokenObject, IUserReq } from '@models/auth.models';
import { SqlResponce } from '@models/response.models';
import { IUser } from '@models/user.models';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Request() req: IUserReq): Promise<ITokenObject> {
    return this.authService.login(req.user);
  }

  @Post('logout')
  public logout(@Body() user: IUser): Promise<SqlResponce> {
    return this.authService.logout(user);
  }
}
