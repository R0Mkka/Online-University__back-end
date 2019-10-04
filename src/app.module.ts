import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { UsersModule } from './users/users.module';
import { CousesModule } from './courses/courses.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    MorganModule.forRoot(),
    UsersModule,
    CousesModule,
    FilesModule,
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
  ],
})
export class AppModule {}
