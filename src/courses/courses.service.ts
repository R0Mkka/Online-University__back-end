import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';

import { Database } from '../database';
import { CoursesQueries } from './courses.queries';
import { ICourse, CourseDto } from '@models/courses.models';
import { IUserLikePayload } from '@models/auth.models';
import { SqlResponce, ISqlErrorResponce, ISqlSuccessResponce } from '@models/response.models';
import { getItemBySingleParam } from '../shared/helpers';

const db = Database.getInstance();

@Injectable()
export class CoursesService {
  public getUserCourseList(payload: IUserLikePayload): Promise<ICourse[]> {
    const params = [payload.userId];

    return new Promise((resolve) => {
      db.query<ICourse[]>(
        CoursesQueries.GetUserCourseList,
        params,
        (error, courses: ICourse[]) => {
          if (error) {
            resolve(error);
          }

          resolve(courses);
        });
    });
  }

  public createCourse(course: CourseDto, payload: IUserLikePayload): Promise<SqlResponce> {
    const params = Object.values(course).concat(payload.userId);

    return new Promise((resolve) => {
      db.query<SqlResponce>(
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

  public async createConnection(courseCode: string, payload: IUserLikePayload): Promise<SqlResponce> {
    const course: ICourse = await this.getCourseByCode(courseCode);

    if (!course) {
      throw new NotFoundException();
    }

    return this.createUserCourseConnection(payload.userId, course.courseId);
  }

  public async removeCourse(courseId: string, payload: IUserLikePayload): Promise<SqlResponce> {
    const course: ICourse = await this.getCourseById(courseId);

    if (!course) {
      throw new NotFoundException();
    }

    if (course.courseOwnerId !== payload.userId) {
      throw new ForbiddenException();
    }

    const params = [courseId];

    return new Promise((resolve) => {
      db.query<SqlResponce>(
        CoursesQueries.RemoveCourse,
        params,
        (error: ISqlErrorResponce, removingInfo: ISqlSuccessResponce) => {
          if (error) {
            resolve(error);
          }

          resolve(removingInfo);
        });
    });
  }

  private createUserCourseConnection(userId: number, courseId: number): Promise<SqlResponce> {
    const params = [userId, courseId];

    return new Promise((resolve) => {
      db.query<SqlResponce>(
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

  private getCourseById(courseId: string): Promise<ICourse> {
    return getItemBySingleParam<ICourse>(
      courseId,
      CoursesQueries.GetCourseById,
    );
  }

  private getCourseByCode(courseCode: string): Promise<ICourse> {
    return getItemBySingleParam<ICourse>(
      courseCode,
      CoursesQueries.GetCourseByCode,
    );
  }
}
