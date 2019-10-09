import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CousesModule } from './courses/courses.module';
import { ChatModule } from './chat/chat.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    MorganModule.forRoot(),
    AuthModule,
    UsersModule,
    CousesModule,
    ChatModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
})
export class AppModule {}
