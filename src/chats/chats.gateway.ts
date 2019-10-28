import { WebSocketGateway, OnGatewayInit, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';

import { ChatsService } from './chats.service';
import { IDBMessage } from '../models/chats.models';
import { ISqlSuccessResponce } from '@models/response.models';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayInit {
  @WebSocketServer()
  private wss: Server;

  private logger: Logger = new Logger('ChatsGateway');

  constructor(
    private readonly chatsService: ChatsService,
  ) {}

  public afterInit(): void {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('msgToServer')
  public async hangleMessage(_: any, data: any): Promise<void> {
    const addedMessageInfo: ISqlSuccessResponce = await this.chatsService.addMessage({
      messageText: data.messageText,
      chatId: data.chatId,
      userId: data.user.userId,
    } as IDBMessage) as ISqlSuccessResponce;

    this.wss.emit(`msgToClient:chatId${data.chatId}`, {
      messageId: addedMessageInfo.insertId,
      messageText: data.messageText,
      chatId: data.chatId,
      userId: data.user.userId,
      authorName: `${data.user.firstName} ${data.user.lastName}`,
      sentAt: Date.now().toString(),
    });
  }
}
