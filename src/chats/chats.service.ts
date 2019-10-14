import { Injectable } from '@nestjs/common';

import { Database } from '../database';
import { ChatsQueries } from './chats.queries';
import { IUserLikePayload } from '../models/auth.models';
import { ISqlErrorResponce, ISqlSuccessResponce, SqlResponce } from '../models/response.models';
import { IChat, IMessage } from '../models/chats.models';
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
      const messages: IMessage[] = await this.getChatMessages(chat.chatId);

      chat.messages = messages;

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

  public addMessage(messageObject: IMessage): Promise<SqlResponce> {
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

  private getChatMessages(chatId: number): Promise<IMessage[]> {
    const params = [chatId];

    return new Promise((resolve, reject) => {
      db.query(
        ChatsQueries.GetChatMessages,
        params,
        (error: ISqlErrorResponce, messages: IMessage[]) => {
          if (error) {
            reject(error);
          }

          resolve(messages);
        });
    });
  }
}
