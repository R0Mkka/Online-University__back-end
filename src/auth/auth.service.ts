import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// import { UsersService } from '../users/users.service';

// import { IUser, ISafeUser, UserDto } from '../models/user.models';
// import { ITokenObject, ITokenSignPayload, IUserLikePayload } from '../models/auth.models';
// import { SqlResponce } from '../models/response.models';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly usersService: UsersService,
  ) { }

  public async validateUser(userName: string, passwordToCompare: string): Promise<any | null> {
    // const user: any = await this.usersService.getUserByUserName(userName);

    // if (user && await bcrypt.compare(passwordToCompare, user.password)) {
    //   const { password, ...userData } = user;

    //   return userData;
    // }

    return null;
  }

  public async login(user: any): Promise<any> {
    const payload: any = {
      sub: user.userId,
      userName: user.userName,
      roleId: user.roleId,
    };

    // await this.usersService.addEnteredUser(user.userId);

    return {
      token: this.jwtService.sign(payload),
    };
  }

  public logout(user: any): void {
    // return this.usersService.deleteEnteredUser(user.userId);
  }
}
