import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Database } from '../database';
import { IUser, UserDto, ISafeUser } from '@models/user.models';
import { SqlResponce, ISqlSuccessResponce, ISqlErrorResponce } from '@models/response.models';
import { UsersQueries } from './users.queries';
import { getItemBySingleParam } from '../shared/helpers';

const db = Database.getInstance();

@Injectable()
export class UsersService {
  public getUserList(): Promise<IUser[]> {
    return new Promise((resolve) => {
      db.query<IUser[]>(
        UsersQueries.GetAllUsers,
        (error, users: IUser[]) => {
          if (error) {
            resolve(error);
          }

          resolve(users);
        });
    });
  }

  public getUserById(userId: string): Promise<ISafeUser> {
    return getItemBySingleParam<IUser>(
      userId,
      UsersQueries.GetUserById,
    ).then((user: IUser) => {
      const { password, ...safeUser } = user;

      return safeUser;
    });
  }

  public getUserByUserName(userName: string): Promise<IUser> {
    return getItemBySingleParam<IUser>(
      userName,
      UsersQueries.GetUserByUserName,
    );
  }

  public async createUser(userData: UserDto): Promise<SqlResponce> {
    const params = Object.values(userData);
    const hashedPassword = await bcrypt.hash(params.pop(), 10);

    params.push(hashedPassword);

    return new Promise((resolve) => {
      db.query<SqlResponce>(
        UsersQueries.CreateUser,
        params,
        (error: ISqlErrorResponce, creationInfo: ISqlSuccessResponce) => {
          if (error) {
            resolve(error);
          }

          resolve(creationInfo);
        },
      );
    });
  }
}
