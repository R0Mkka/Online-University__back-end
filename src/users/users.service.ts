import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Database } from '../database';
import { IUser, UserDto } from '@models/user.models';
import { SqlResponce, ISqlSuccessResponce, ISqlErrorResponce } from '@models/response.models';
import { UsersQueries } from './users.queries';

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

  // TODO: Rethink the necceserity of this method
  public getUserById(userId: string): Promise<IUser> {
    return this.getUserBySingleParam(
      UsersQueries.GetUserById,
      userId,
    );
  }

  public getUserByUserName(userName: string): Promise<IUser> {
    return this.getUserBySingleParam(
      UsersQueries.GetUserByUserName,
      userName,
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

  private getUserBySingleParam(queryString: string, param: any): Promise<IUser> {
    return new Promise((resolve) => {
      db.query<IUser>(
        queryString,
        [param],
        (error, users: IUser[]) => {
          if (error || users.length === 0) {
            resolve(null);
          }

          resolve(users[0]);
        },
      );
    });
  }
}
