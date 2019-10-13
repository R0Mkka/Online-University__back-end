import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';

import { ChatsService } from '../chats/chats.service';

import { Database } from '../database';
import { CoursesQueries } from './courses.queries';
import { ICourse, CourseDto, IFullCourse, ICourseItem } from '../models/courses.models';
import { IUserLikePayload } from '../models/auth.models';
import { SqlResponce, ISqlErrorResponce, ISqlSuccessResponce } from '../models/response.models';
import { getItemBySingleParam } from '../shared/helpers';

const db = Database.getInstance();

@Injectable()
export class CoursesService {
  constructor(
    private readonly chatsService: ChatsService,
  ) {}

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

  public async getFullCourseInfo(courseId: string): Promise<IFullCourse> {
    const course: ICourse = await this.getCourseById(courseId);
    const params = [courseId];

    return new Promise((resolve, reject) => {
      db.query<any>(
        CoursesQueries.GetFullCourseInfo,
        params,
        (error, courseItems: ICourseItem[]) => {
          if (error || !course) {
            reject(new NotFoundException());
          }

          resolve({
            ...course,
            items: courseItems.filter((courseItem: ICourseItem) => courseItem.courseItemId !== null),
          });
        });
    });
  }

  public createCourse(course: CourseDto, payload: IUserLikePayload): Promise<SqlResponce> {
    return this.chatsService
      .createChat(`Чат курса '${course.courseName}'`, payload)
      .then((response: ISqlSuccessResponce) => {
        const params = Object.values(course).concat(payload.userId).concat(response.insertId);

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
        .then((newResponse: ISqlSuccessResponce) => {
          return this.createUserCourseConnection(payload.userId, newResponse.insertId);
        });
      });
  }

  public async createConnection(courseCode: string, payload: IUserLikePayload): Promise<SqlResponce> {
    const course: ICourse = await this.getCourseByCode(courseCode);

    if (!course) {
      throw new NotFoundException();
    }

    return this.createUserCourseConnection(payload.userId, course.courseId)
      .then((_: ISqlSuccessResponce) => {
        return this.chatsService.createChatUserConnection(course.chatId, payload);
      });
  }

  public destroyConnection(courseCode: string, payload: IUserLikePayload): Promise<SqlResponce> {
    const params = [courseCode, payload.userId];

    return new Promise((resolve) => {
      db.query(
        CoursesQueries.DestroyUserCourseConnection,
        params,
        (error: ISqlErrorResponce, destroyingInfo: ISqlSuccessResponce) => {
          if (error) {
            resolve(error);
          }

          resolve(destroyingInfo);
        });
    });
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
