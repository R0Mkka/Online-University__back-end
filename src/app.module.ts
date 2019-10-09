import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CousesModule } from './courses/courses.module';

import { AppController } from './app.controller';
// NEW
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    MorganModule.forRoot(),
    UsersModule,
    CousesModule,
    AuthModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
    // NEW
    AppGateway,
  ],
})
export class AppModule {}
