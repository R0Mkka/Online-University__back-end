import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth/auth.service';

import { ITokenObject } from '@models/auth.models';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Request() req): Promise<ITokenObject> {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard())
  @Get('me')
  public getProfile(@Request() req) {
    return req.user;
  }
}
