import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CoursesService } from './courses.service';
import { NoStudentsGuard } from './roles.guard';

import { CoursesController } from './courses.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    CoursesController,
  ],
  providers: [
    CoursesService,
    NoStudentsGuard,
  ],
})
export class CousesModule { }
