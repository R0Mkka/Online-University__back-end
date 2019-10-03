export interface ICourse {
  courseId: number;
  courseName: string;
  courseDescription: string;
  courseCode: string;
  courseOwnerId: number;
  addedAt: string;
}

export interface CourseDto {
  courseName: string;
  courseDescription: string;
  courseCode: string;
}

export interface IJoinCourse {
  courseCode: string;
}
