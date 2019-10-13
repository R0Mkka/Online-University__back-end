import { Injectable } from '@nestjs/common';

import { Database } from '../database';
import { ChatsQueries } from './chats.queries';
import { IUserLikePayload } from '../models/auth.models';
import { ISqlErrorResponce, ISqlSuccessResponce, SqlResponce } from '../models/response.models';
import { IChat } from '../models/chats.models';

const db = Database.getInstance();

@Injectable()
export class ChatsService {
  public getUserChats(payload: IUserLikePayload): Promise<IChat[]> {
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

  public createChat(chatName: string, payload: IUserLikePayload): Promise<SqlResponce> {
    const params = [payload.userId, chatName];

    return new Promise((resolve, reject) => {
      db.query(
        ChatsQueries.CreateChat,
        params,
        (error: ISqlErrorResponce, creationInfo: ISqlSuccessResponce) => {
          if (error) {
            reject(error);
          }

          resolve(creationInfo);
        });
    });
  }

  public createChatUserConnection(chatId: string, payload: IUserLikePayload): Promise<SqlResponce> {
    const params = [chatId, payload.userId];

    return new Promise((resolve, reject) => {
      db.query(
        ChatsQueries.CreateChatConnection,
        params,
        (error: ISqlErrorResponce, creationInfo: ISqlSuccessResponce) => {
          if (error) {
            reject(error);
          }

          resolve(creationInfo);
        });
    });
  }
}
