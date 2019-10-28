export enum Roles {
  Teacher = 1,
  Student = 2,
  Admin = 3,
}

export interface ISafeUser {
  userId: number;
  roleId: Roles;
  login: string;
  firstName: string;
  lastName: string;
  educationalInstitution: string;
  email: string;
  registeredAt: string;
  avatarLabel: string;
  avatarPath: string;
  avatarAddedAt: string;
  themeName: string;
  languageName: string;
}

export interface IUser extends ISafeUser {
  password: string;
}
