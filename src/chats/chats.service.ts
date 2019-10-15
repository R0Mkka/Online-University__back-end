import { Injectable } from '@nestjs/common';

import { Database } from '../database';
import { ChatsQueries } from './chats.queries';
import { IUserLikePayload } from '../models/auth.models';
import { ISqlErrorResponce, ISqlSuccessResponce, SqlResponce } from '../models/response.models';
import { IChat, IResponseMessage, IDBMessage } from '../models/chats.models';
import { ISafeUser } from '../models/user.models';
import { getItemBySingleParam } from '../shared/helpers';

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

  public getChat(chatId: string): Promise<IChat> {
    return getItemBySingleParam(
      chatId,
      ChatsQueries.GetChat,
    ).then(async (chat: IChat) => {
      const messages: IResponseMessage[] = await this.getChatMessages(chat.chatId);
      const users: ISafeUser[] = await this.getChatUsers(chat.chatId);

      chat.messages = messages;
      chat.users = users;

      return chat;
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

  public addMessage(messageObject: IDBMessage): Promise<SqlResponce> {
    const params = Object.values(messageObject);

    return new Promise((resolve, reject) => {
      db.query(
        ChatsQueries.AddMessage,
        params,
        (error: ISqlErrorResponce, addingInfo: ISqlSuccessResponce) => {
          if (error) {
            reject(error);
          }

          resolve(addingInfo);
        });
    });
  }

  private getChatMessages(chatId: number): Promise<IResponseMessage[]> {
    const params = [chatId];

    return new Promise((resolve, reject) => {
      db.query(
        ChatsQueries.GetChatMessages,
        params,
        (error: ISqlErrorResponce, messages: IResponseMessage[]) => {
          if (error) {
            reject(error);
          }

          resolve(messages);
        });
    });
  }

  public getChatUsers(chatId: number): Promise<ISafeUser[]> {
    const params = [chatId];

    return new Promise((resolve, reject) => {
      db.query(
        ChatsQueries.GetChatUsers,
        params,
        (error: ISqlErrorResponce, users: ISafeUser[]) => {
          if (error) {
            reject(error);
          }

          resolve(users);
        });
    });
  }
}
