import { Injectable } from '@nestjs/common';

import { Database } from '../database';
import { UsersQueries } from './users.queries';

const db = Database.getInstance();

interface IUser {
  name: string;
}

@Injectable()
export class UsersService {
  public getUserList(): Promise<any> {
    return new Promise((resolve, reject) => {
      db.query(UsersQueries.GetUserList,
      (err, results) => {
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  }
}
