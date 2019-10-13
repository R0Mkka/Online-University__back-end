import { ApiModelProperty } from '@nestjs/swagger';

export interface IChat {
  chatId: number;
  imageId: number;
  chatName: string;
  createdAt: string;
}

export interface IJoinChatDto {
  chatId: string;
}

export class CreateChatDto {
  @ApiModelProperty()
  public chatName: string;
}
