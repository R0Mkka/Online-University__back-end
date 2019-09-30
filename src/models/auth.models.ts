import { Roles } from './roles.models';

export interface ITokenObject {
  token: string;
}

export interface ITokenSignPayload {
  sub: number;
  userName: string;
  roleId: Roles;
}
