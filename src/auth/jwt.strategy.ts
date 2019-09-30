import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { ITokenSignPayload } from '@models/auth.models';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      usernameField: 'userName',
    });
  }

  public async validate(payload: ITokenSignPayload): Promise<any> {
    return {
      userId: payload.sub,
      userName: payload.userName,
      roleId: payload.roleId,
    };
  }
}
