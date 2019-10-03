const TABLE_NAME = 'courses';

export enum CoursesQueryList {
  GetUserCourseList = 'GetUserCourseList',
  GetCourseById = 'GetCourseById',
  GetCourseByCode = 'GetCourseByCode',
  CreateCourse = 'CreateCourse',
  CreateUserCourseConnection = 'CreateUserCourseConnection',
  RemoveCourse = 'RemoveCourse',
}

export const CoursesQueries: { [key in CoursesQueryList]: string } = {
  GetUserCourseList: `
    SELECT
      ${TABLE_NAME}.courseId,
      ${TABLE_NAME}.courseName,
      ${TABLE_NAME}.courseDescription,
      ${TABLE_NAME}.courseCode,
      ${TABLE_NAME}.courseOwnerId,
      ${TABLE_NAME}.addedAt
    FROM
      users
    INNER JOIN user_course
    USING (userId)
    INNER JOIN ${TABLE_NAME}
    USING (courseId)
    WHERE users.userId = ?;
  `,
  GetCourseById: `
    SELECT
      ${TABLE_NAME}.courseId,
      ${TABLE_NAME}.courseName,
      ${TABLE_NAME}.courseDescription,
      ${TABLE_NAME}.courseCode,
      ${TABLE_NAME}.courseOwnerId,
      ${TABLE_NAME}.addedAt
    FROM
      courses
    WHERE courseId = ?;
  `,
  GetCourseByCode: `
    SELECT
      ${TABLE_NAME}.courseId,
      ${TABLE_NAME}.courseName,
      ${TABLE_NAME}.courseDescription,
      ${TABLE_NAME}.courseCode,
      ${TABLE_NAME}.courseOwnerId,
      ${TABLE_NAME}.addedAt
    FROM
      courses
    WHERE courseCode = ?;
  `,
  CreateCourse: `
    INSERT INTO ${TABLE_NAME} (
      courseName,
      courseDescription,
      courseCode,
      courseOwnerId
    )
    VALUES (?,?,?,?);
  `,
  CreateUserCourseConnection: `
    INSERT INTO user_course (
      userId,
      courseId
    )
    VALUES (?,?);
  `,
  RemoveCourse: `
    DELETE
    FROM
      courses
    WHERE
      courseId = ?;
  `,
};
