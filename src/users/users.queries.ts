const TABLE_NAME = 'users';

export enum UserQueryList {
  GetAllUsers = 'GetAllUsers',
  GetUserById = 'GetUserById',
  GetUserByUserName = 'GetUserByUserName',
  DeleteEnteredUser = 'DeleteEnteredUser',
  AddEnteredUser = 'AddEnteredUser',
  AddEnteredUserToArchive = 'AddEnteredUserToArchive',
  UpdateEnteredUser = 'UpdateEnteredUser',
  CreateUser = 'CreateUser',
}

export const UsersQueries: { [key in UserQueryList]: string } = {
  GetAllUsers: `
    SELECT
      *
    FROM
      ${TABLE_NAME};
  `,
  GetUserById: `
    SELECT
      u.userId,
      u.roleId,
      u.userName,
      u.firstName,
      u.lastName,
      u.educationalInstitution,
      u.email,
      u.registeredAt,
      u.accountImageId,
      u.themeId,
      u.languageId,
      eu.statusId,
      eu.enteredAt
    FROM
      (
        SELECT *
        FROM ${TABLE_NAME}
        WHERE userId = ?
      ) as u
    LEFT JOIN
      entered_users eu
    ON
      u.userId = eu.enteredUserId
    ORDER BY
      eu.enteredAt DESC
    LIMIT 1;
  `,
  GetUserByUserName: `
    SELECT
      *
    FROM
      ${TABLE_NAME}
    WHERE
      userName = ?;
  `,
  DeleteEnteredUser: `
    DELETE
    FROM
      entered_users
    WHERE
      entered_users.enteredUserId = ?;
  `,
  AddEnteredUser: `
    INSERT INTO entered_users(enteredUserId)
    VALUES (?);
  `,
  AddEnteredUserToArchive: `
    INSERT INTO entered_users_archive(
      archivedUserId,
      statusId,
      enteredAt
    )
    SELECT
      enteredUserId,
      statusId,
      enteredAt
    FROM
      entered_users
    WHERE
      enteredUserId = ?
    ORDER BY
      entered_users.enteredAt DESC
    LIMIT 1;
  `,
  UpdateEnteredUser: `
    UPDATE entered_users
    SET
      statusId = 3,
      leftAt = CURRENT_TIMESTAMP()
    WHERE
      enteredUserId = ?;
  `,
  CreateUser: `
    INSERT INTO ${TABLE_NAME} (
      roleId,
      firstName,
      lastName,
      userName,
      educationalInstitution,
      email,
      password
    )
    VALUES (?,?,?,?,?,?,?)
  `,
};
