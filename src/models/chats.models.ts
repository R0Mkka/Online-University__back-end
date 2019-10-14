import { ApiModelProperty } from '@nestjs/swagger';

export interface IChat {
  chatId: number;
  imageId: number;
  chatName: string;
  createdAt: string;
  messages: IMessage[];
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
  chatId: number;
  userId: number;
}
