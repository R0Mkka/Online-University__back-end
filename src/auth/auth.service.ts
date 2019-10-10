import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { IUser, ISafeUser, UserDto } from '../models/user.models';
import { ITokenObject, ITokenSignPayload, IUserLikePayload } from '../models/auth.models';
import { SqlResponce } from '../models/response.models';

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

  public async login(user: IUserLikePayload): Promise<ITokenObject> {
    const payload: ITokenSignPayload = {
      sub: user.userId,
      userName: user.userName,
      roleId: user.roleId,
    };

    await this.usersService.addEnteredUser(user.userId);

    return {
      token: this.jwtService.sign(payload),
    };
  }

  public logout(user: UserDto): Promise<SqlResponce> {
    return this.usersService.deleteEnteredUser(user.userId);
  }
}
