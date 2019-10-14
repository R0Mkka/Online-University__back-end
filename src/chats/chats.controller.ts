import { Controller, UseGuards, Get, Request, Post, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';

import { ChatsService } from './chats.service';

import { IUserReq } from '../models/auth.models';
import { IChat, CreateChatDto, IJoinChatDto } from '../models/chats.models';
import { SqlResponce } from '../models/response.models';

@UseGuards(AuthGuard())
@ApiUseTags('chats')
@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
  ) {}

  @Get()
  public getUserChats(@Request() req: IUserReq): Promise<IChat[]> {
    return this.chatsService.getUserChats(req.user);
  }

  @Get(':chatId')
  public getChat(@Param('chatId') chatId: string): Promise<any> {
    return this.chatsService.getChat(chatId);
  }

  @Post()
  public createChat(@Body() body: CreateChatDto, @Request() req: IUserReq): Promise<SqlResponce> {
    return this.chatsService.createChat(body.chatName, req.user);
  }

  @Post('/join')
  public joinChat(@Body() body: IJoinChatDto, @Request() req: IUserReq): Promise<SqlResponce> {
    return this.chatsService.createChatUserConnection(body.chatId, req.user);
  }
}
