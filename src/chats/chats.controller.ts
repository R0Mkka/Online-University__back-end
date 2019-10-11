import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';

import { ChatsService } from './chats.service';

import { IUserReq } from '../models/auth.models';
import { IChat } from '../models/chats.models';

@UseGuards(AuthGuard())
@ApiUseTags('chats')
@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsServuice: ChatsService,
  ) {}

  @Get()
  public getUserCourses(@Request() req: IUserReq): Promise<IChat[]> {
    return this.chatsServuice.getUserCourses(req.user);
  }
}
