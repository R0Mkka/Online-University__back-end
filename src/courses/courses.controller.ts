import { Controller, UseGuards, Get, Request, Post, Body, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { CoursesService } from './courses.service';
import { NoStudentsGuard } from './roles.guard';
import { ICourse, CourseDto, JoinCourseDto, IFullCourse } from '../models/courses.models';
import { IUserReq } from '@models/auth.models';
import { SqlResponce } from '@models/response.models';

@UseGuards(AuthGuard())
@ApiUseTags('courses')
@ApiBearerAuth()
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
  ) { }

  @Get()
  public getUserCourseList(@Request() req: IUserReq): Promise<ICourse[]> {
    return this.coursesService.getUserCourseList(req.user);
  }

  // TODO: Rethink about getting courses only for users which are in them
  @Get(':courseId')
  public getFullCourseInfo(@Param('courseId') courseId: string): Promise<IFullCourse> {
    return this.coursesService.getFullCourseInfo(courseId);
  }

  @Post('/join')
  public joinCourse(@Body() body: JoinCourseDto, @Request() req: IUserReq): Promise<SqlResponce> {
    return this.coursesService.createConnection(body.courseCode, req.user);
  }

  @Delete('/leave/:courseId')
  public leaveCourse(@Param('courseId') courseId: string, @Request() req: IUserReq): Promise<SqlResponce> {
    return this.coursesService.destroyConnection(courseId, req.user);
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
