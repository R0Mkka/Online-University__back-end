import { Roles } from './roles.models';

export interface ISafeUser {
  userId: number;
  roleId: Roles;
  userName: string;
  firstName: string;
  lastName: string;
  educationalInstitution: string;
  email: string;
  registeredAt: string;
  enteredAt: string;
  statusId: number;
  accountImageId: number;
  themeId: number;
  languageId: number;
}

export interface IUser extends ISafeUser {
  password: string;
}

export interface UserDto {
  roleId: Roles;
  userName: string;
  firstName: string;
  lastName: string;
  educationalInstitution: string;
  email: string;
  password: string;
}
