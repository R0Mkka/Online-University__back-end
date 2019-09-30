const TABLE_NAME = 'courses';

export enum CoursesQueryList {
  GetUserCourseList = 'GetUserCourseList',
  CreateCourse = 'CreateCourse',
  CreateUserCourseConnection = 'CreateUserCourseConnection',
}

export const CoursesQueries: { [key in CoursesQueryList]: string } = {
  GetUserCourseList: `
    SELECT
      ${TABLE_NAME}.courseId,
      ${TABLE_NAME}.courseName,
      ${TABLE_NAME}.courseDescription,
      ${TABLE_NAME}.courseCode,
      ${TABLE_NAME}.addedAt
    FROM
      users
    INNER JOIN user_course
    USING (userId)
    INNER JOIN ${TABLE_NAME}
    USING (courseId)
    WHERE users.userId = ?;
  `,
  CreateCourse: `
    INSERT INTO ${TABLE_NAME} (
      courseName,
      courseDescription,
      courseCode
    )
    VALUES (?,?,?);
  `,
  CreateUserCourseConnection: `
    INSERT INTO user_course (
      userId,
      courseId
    )
    VALUES (?,?);
  `,
};
