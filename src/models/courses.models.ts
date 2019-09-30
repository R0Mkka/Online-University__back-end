export interface ICourse {
  courseId: number;
  courseName: string;
  courseDescription: string;
  courseCode: string;
  addedAt: string;
}

export interface CourseDto {
  courseName: string;
  courseDescription: string;
  courseCode: string;
}
