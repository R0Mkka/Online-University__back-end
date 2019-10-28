export enum UserQueryList {
  GetUserList = 'GetUserList'
}

export const UsersQueries: { [key in UserQueryList]: string } = {
  GetUserList: `
    SELECT
      users.userId,
      users.roleId,
      users.login,
      users.firstName,
      users.lastName,
      users.educationalInstitution,
      users.email,
      users.registeredAt,
      account_images.label avatarLabel,
      account_images.path avatarPath,
      account_images.addedAt avatarAddedAt,
      themes.themeName,
      languages.languageName
    FROM
      users
    LEFT JOIN account_images
      USING (accountImageId)
    LEFT JOIN themes
      USING (themeId)
    LEFT JOIN languages
      USING (languageId);
  `,
};
