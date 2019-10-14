const TABLE_NAME = 'courses';
const COURSE_ITEMS_TABLE = 'course_items';

export enum CoursesQueryList {
  GetUserCourseList = 'GetUserCourseList',
  GetCourseById = 'GetCourseById',
  GetFullCourseInfo = 'GetFullCourseInfo',
  GetCourseByCode = 'GetCourseByCode',
  CreateCourse = 'CreateCourse',
  CreateUserCourseConnection = 'CreateUserCourseConnection',
  DestroyUserCourseConnection = 'DestroyUserCourseConnection',
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
      ${TABLE_NAME}.addedAt,
      cd.courseStatus,
      cd.coursePaletteId,
      cd.courseIconId,
      CONCAT(users.firstName, ' ', users.lastName) teacherName
    FROM
      users
    INNER JOIN user_course
    USING (userId)
    INNER JOIN ${TABLE_NAME}
    USING (courseId)
    LEFT JOIN course_data cd
    USING(courseId)
    WHERE users.userId = ?;
  `,
  GetCourseById: `
    SELECT
      ${TABLE_NAME}.courseId,
      ${TABLE_NAME}.courseName,
      ${TABLE_NAME}.courseDescription,
      ${TABLE_NAME}.courseCode,
      ${TABLE_NAME}.courseOwnerId,
      ${TABLE_NAME}.addedAt,
      cd.courseStatus,
      cd.coursePaletteId,
      cd.courseIconId,
      CONCAT(users.firstName, ' ', users.lastName) teacherName
    FROM
      ${TABLE_NAME}
    LEFT JOIN
      users
    ON users.userId = ${TABLE_NAME}.courseOwnerId
    LEFT JOIN
      course_data cd
    USING(courseId)
    WHERE courseId = ?;
  `,
  GetFullCourseInfo: `
    SELECT
      ${COURSE_ITEMS_TABLE}.courseItemId,
      ${COURSE_ITEMS_TABLE}.courseItemTitle,
      ${COURSE_ITEMS_TABLE}.courseItemText,
      ${COURSE_ITEMS_TABLE}.addedAt
    FROM
      ${TABLE_NAME}
    LEFT JOIN
      ${COURSE_ITEMS_TABLE}
    USING (courseId)
      WHERE ${TABLE_NAME}.courseId = ?;
  `,
  GetCourseByCode: `
    SELECT
      ${TABLE_NAME}.courseId,
      ${TABLE_NAME}.courseName,
      ${TABLE_NAME}.courseDescription,
      ${TABLE_NAME}.courseCode,
      ${TABLE_NAME}.courseOwnerId,
      ${TABLE_NAME}.chatId,
      ${TABLE_NAME}.addedAt
    FROM
      ${TABLE_NAME}
    WHERE courseCode = ?;
  `,
  CreateCourse: `
    INSERT INTO ${TABLE_NAME} (
      courseName,
      courseDescription,
      courseGroupName,
      courseCode,
      courseOwnerId,
      chatId
    )
    VALUES (?,?,?,?,?,?);
  `,
  CreateUserCourseConnection: `
    INSERT INTO user_course (
      userId,
      courseId
    )
    VALUES (?,?);
  `,
  DestroyUserCourseConnection: `
      DELETE
      FROM
        user_course
      WHERE
        courseId = ? AND userId = ?;
  `,
  RemoveCourse: `
    DELETE
    FROM
      ${TABLE_NAME}
    WHERE
      courseId = ?;
  `,
};
