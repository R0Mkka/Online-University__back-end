const TABLE_NAME = 'users';

export enum UserQueryList {
  GetAllUsers = 'GetAllUsers',
  GetUserById = 'GetUserById',
  GetUserByUserName = 'GetUserByUserName',
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
      *
    FROM
      ${TABLE_NAME}
    WHERE
      userId = ?;
  `,
  GetUserByUserName: `
    SELECT
      *
    FROM
      ${TABLE_NAME}
    WHERE
      userName = ?;
  `,
  CreateUser: `
    INSERT INTO ${TABLE_NAME} (
      roleId,
      userName,
      firstName,
      lastName,
      educationalInstitution,
      email,
      password
    )
    VALUES (?,?,?,?,?,?,?)
  `,
};
