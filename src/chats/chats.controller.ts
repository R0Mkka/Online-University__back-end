import { Controller, UseGuards, Get, Request, Post, Body } from '@nestjs/common';
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
    private readonly chatsServuice: ChatsService,
  ) {}

  @Get()
  public getUserChats(@Request() req: IUserReq): Promise<IChat[]> {
    return this.chatsServuice.getUserChats(req.user);
  }

  @Post()
  public createChat(@Body() body: CreateChatDto, @Request() req: IUserReq): Promise<SqlResponce> {
    return this.chatsServuice.createChat(body.chatName, req.user);
  }

  @Post('/join')
  public joinChat(@Body() body: IJoinChatDto, @Request() req: IUserReq): Promise<SqlResponce> {
    return this.chatsServuice.createChatUserConnection(body.chatId, req.user);
  }
}
