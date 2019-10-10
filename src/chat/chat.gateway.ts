import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private wss: Server;

  private logger: Logger = new Logger('ChatGateway');

  public afterInit(server: Server): void {
    this.logger.log('Initialized!');
  }

  public handleConnection(client: Socket, ...args: any[]): void {
    this.logger.log(`Client connected: ${client.id}`);
  }

  public handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  public handleMessage(client: Socket, { user, text }): void {
    this.wss.emit('msgToClient', { user, text });

    this.logger.log(`Message from ${user.firstName} ${user.lastName}: ${text}`);
  }
}
