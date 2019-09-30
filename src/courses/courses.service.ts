import { Injectable } from '@nestjs/common';

import { Database } from '../database';
import { CoursesQueries } from './courses.queries';
import { ICourse, CourseDto } from '@models/courses.models';
import { IUserLikePayload } from '@models/auth.models';
import { SqlResponce, ISqlErrorResponce, ISqlSuccessResponce } from '@models/response.models';

const db = Database.getInstance();

@Injectable()
export class CoursesService {
  public getUserCourseList(payload: IUserLikePayload): Promise<ICourse[]> {
    const params = [payload.userId];

    return new Promise((resolve) => {
      db.query<any>(
        CoursesQueries.GetUserCourseList,
        params,
        (error, courses: any) => {
          if (error) {
            resolve(error);
          }

          resolve(courses);
        });
    });
  }

  public createCourse(course: CourseDto, payload: IUserLikePayload): Promise<SqlResponce> {
    const params = Object.values(course);

    return new Promise((resolve) => {
      db.query<any>(
        CoursesQueries.CreateCourse,
        params,
        (error: ISqlErrorResponce, creationInfo: ISqlSuccessResponce) => {
          if (error) {
            resolve(error);
          }

          resolve(creationInfo);
        });
    })
    .then((response: ISqlSuccessResponce) => {
      return this.createUserCourseConnection(payload.userId, response.insertId);
    });
  }

  private createUserCourseConnection(userId: number, courseId: number): Promise<SqlResponce> {
    const params = [userId, courseId];

    return new Promise((resolve) => {
      db.query<any>(
        CoursesQueries.CreateUserCourseConnection,
        params,
        (error: ISqlErrorResponce, creationInfo: ISqlSuccessResponce) => {
          if (error) {
            resolve(error);
          }

          resolve(creationInfo);
        });
    });
  }
}
