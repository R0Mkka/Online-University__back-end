import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ISafeUser } from '@models/user.models';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({ usernameField: 'userName' });
  }

  public async validate(userName: string, password: string): Promise<any> {
    const user: ISafeUser = await this.authService.validateUser(userName, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
