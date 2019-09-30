import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { IUser, ISafeUser } from '@models/user.models';
import { ITokenObject, ITokenSignPayload } from '@models/auth.models';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) { }

  public async validateUser(userName: string, passwordToCompare: string): Promise<ISafeUser | null> {
    const user: IUser = await this.usersService.getUserByUserName(userName);

    if (user && await bcrypt.compare(passwordToCompare, user.password)) {
      const { password, ...userData } = user;

      return userData;
    }

    return null;
  }

  public async login(user: ISafeUser): Promise<ITokenObject> {
    const payload: ITokenSignPayload = {
      sub: user.userId,
      userName: user.userName,
      roleId: user.roleId,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
