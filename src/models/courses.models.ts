import { ApiModelProperty } from '@nestjs/swagger';

export interface ICourse {
  courseId: number;
  courseName: string;
  courseDescription: string;
  courseCode: string;
  courseOwnerId: number;
  addedAt: string;
}

export interface IFullCourse extends ICourse {
  items: ICourseItem[];
}

export interface CourseDto {
  courseName: string;
  courseDescription: string;
  courseCode: string;
}

export class JoinCourseDto {
  @ApiModelProperty()
  public courseCode: string;
}

export interface ICourseItem {
  courseItemId: number;
  courseItemTitle: string;
  courseItemText: string;
  addedAt: string;
}
