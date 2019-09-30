import { Controller, UseGuards, Get, Request, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CoursesService } from './courses.service';
import { NoStudentsGuard } from './roles.guard';
import { ICourse, CourseDto } from '@models/courses.models';
import { IUserLikePayload } from '@models/auth.models';
import { SqlResponce } from '@models/response.models';

@UseGuards(AuthGuard())
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
  ) { }

  @Get()
  public getUserCourseList(@Request() req): Promise<ICourse[]> {
    return this.coursesService.getUserCourseList(req.user as IUserLikePayload);
  }

  @UseGuards(NoStudentsGuard)
  @Post()
  public createCourse(@Body() course: CourseDto, @Request() req): Promise<SqlResponce> {
    return this.coursesService.createCourse(course, req.user as IUserLikePayload);
  }
}
