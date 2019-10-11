import { Injectable } from '@nestjs/common';

import { Database } from '../database';
import { ChatsQueries } from './chats.queries';
import { IUserLikePayload } from '../models/auth.models';
import { ISqlErrorResponce } from '../models/response.models';
import { IChat } from '../models/chats.models';

const db = Database.getInstance();

@Injectable()
export class ChatsService {
  public getUserCourses(payload: IUserLikePayload): Promise<IChat[]> {
    const params = [payload.userId];

    return new Promise((resolve, reject) => {
      db.query<IChat[]>(
        ChatsQueries.GetUserChats,
        params,
        (error: ISqlErrorResponce, chats: IChat[]) => {
          if (error) {
            reject(error);
          }

          resolve(chats);
        });
    });
  }
}
