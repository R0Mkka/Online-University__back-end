import { ApiModelProperty } from '@nestjs/swagger';

import { ISafeUser } from './user.models';

export interface IChat {
  chatId: number;
  creatorId: number;
  imageId: number;
  chatName: string;
  createdAt: string;
  messages: IResponseMessage[];
  users: ISafeUser[];
}

export interface IJoinChatDto {
  chatId: string;
}

export class CreateChatDto {
  @ApiModelProperty()
  public chatName: string;
}

export interface IMessage {
  messageId: number;
  messageText: string;
  userId: number;
  sentAt: string;
}

export interface IDBMessage extends IMessage {
  chatId: number;
}

export interface IResponseMessage extends IMessage {
  authorName: string;
}
