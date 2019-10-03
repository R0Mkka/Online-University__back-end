import { Controller, UseGuards, Get, Request, Post, Body, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CoursesService } from './courses.service';
import { NoStudentsGuard } from './roles.guard';
import { ICourse, CourseDto, IJoinCourse } from '@models/courses.models';
import { IUserReq } from '@models/auth.models';
import { SqlResponce } from '@models/response.models';

@UseGuards(AuthGuard())
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
  ) { }

  @Get()
  public getUserCourseList(@Request() req: IUserReq): Promise<ICourse[]> {
    return this.coursesService.getUserCourseList(req.user);
  }

  @Post('/join')
  public createConnection(@Body() body: IJoinCourse, @Request() req: IUserReq): Promise<SqlResponce> {
    return this.coursesService.createConnection(body.courseCode, req.user);
  }

  @UseGuards(NoStudentsGuard)
  @Post()
  public createCourse(@Body() course: CourseDto, @Request() req: IUserReq): Promise<SqlResponce> {
    return this.coursesService.createCourse(course, req.user);
  }

  @UseGuards(NoStudentsGuard)
  @Delete(':courseId')
  public removeCourse(@Param('courseId') courseId: string, @Request() req: IUserReq): any {
    return this.coursesService.removeCourse(courseId, req.user);
  }
}
