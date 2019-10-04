const COURSES_TABLE = 'courses';
const COURSE_ITEMS_TABLE = 'course_items';

export enum CoursesQueryList {
  GetUserCourseList = 'GetUserCourseList',
  GetCourseById = 'GetCourseById',
  GetFullCourseInfo = 'GetFullCourseInfo',
  GetCourseByCode = 'GetCourseByCode',
  CreateCourse = 'CreateCourse',
  CreateUserCourseConnection = 'CreateUserCourseConnection',
  RemoveCourse = 'RemoveCourse',
}

export const CoursesQueries: { [key in CoursesQueryList]: string } = {
  GetUserCourseList: `
    SELECT
      ${COURSES_TABLE}.courseId,
      ${COURSES_TABLE}.courseName,
      ${COURSES_TABLE}.courseDescription,
      ${COURSES_TABLE}.courseCode,
      ${COURSES_TABLE}.courseOwnerId,
      ${COURSES_TABLE}.addedAt
    FROM
      users
    INNER JOIN user_course
    USING (userId)
    INNER JOIN ${COURSES_TABLE}
    USING (courseId)
    WHERE users.userId = ?;
  `,
  GetCourseById: `
    SELECT
      ${COURSES_TABLE}.courseId,
      ${COURSES_TABLE}.courseName,
      ${COURSES_TABLE}.courseDescription,
      ${COURSES_TABLE}.courseCode,
      ${COURSES_TABLE}.courseOwnerId,
      ${COURSES_TABLE}.addedAt
    FROM
      ${COURSES_TABLE}
    WHERE courseId = ?;
  `,
  GetFullCourseInfo: `
    SELECT
      ${COURSE_ITEMS_TABLE}.courseItemId,
      ${COURSE_ITEMS_TABLE}.courseItemTitle,
      ${COURSE_ITEMS_TABLE}.courseItemText,
      ${COURSE_ITEMS_TABLE}.addedAt
    FROM
      ${COURSES_TABLE}
    LEFT JOIN
      ${COURSE_ITEMS_TABLE}
    USING (courseId)
      WHERE ${COURSES_TABLE}.courseId = ?;
  `,
  GetCourseByCode: `
    SELECT
      ${COURSES_TABLE}.courseId,
      ${COURSES_TABLE}.courseName,
      ${COURSES_TABLE}.courseDescription,
      ${COURSES_TABLE}.courseCode,
      ${COURSES_TABLE}.courseOwnerId,
      ${COURSES_TABLE}.addedAt
    FROM
      ${COURSES_TABLE}
    WHERE courseCode = ?;
  `,
  CreateCourse: `
    INSERT INTO ${COURSES_TABLE} (
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
      ${COURSES_TABLE}
    WHERE
      courseId = ?;
  `,
};
