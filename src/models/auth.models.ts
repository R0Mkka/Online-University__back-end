import { Roles } from './roles.models';
import { ApiModelProperty } from '@nestjs/swagger';

export interface ITokenObject {
  token: string;
}

export interface ITokenSignPayload {
  sub: number;
  userName: string;
  roleId: Roles;
}

export interface IUserLikePayload {
  userId: number;
  userName: string;
  roleId: Roles;
}

export interface IUserReq {
  user: IUserLikePayload;
}

export class LoginDto {
  @ApiModelProperty({ type: String, required: true })
  public userName: string;

  @ApiModelProperty({ type: String, required: true })
  public password: string;
}
