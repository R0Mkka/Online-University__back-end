import { ApiModelProperty } from '@nestjs/swagger';

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

export class UserDto implements ISafeUser {
  @ApiModelProperty({ type: Number, required: true })
  public userId: number;

  @ApiModelProperty({ type: Number, enum: [1, 2, 3], required: true })
  public roleId: Roles;

  @ApiModelProperty({ type: String, required: true })
  public userName: string;

  @ApiModelProperty({ type: String, required: true })
  public firstName: string;

  @ApiModelProperty({ type: String, required: true })
  public lastName: string;

  @ApiModelProperty({ type: String, required: true })
  public educationalInstitution: string;

  @ApiModelProperty({ type: String, required: true })
  public email: string;

  @ApiModelProperty({ type: String, required: true })
  public registeredAt: string;

  @ApiModelProperty({ type: String, required: true })
  public enteredAt: string;

  @ApiModelProperty({ type: Number, required: true })
  public statusId: number;

  @ApiModelProperty({ type: Number, required: true })
  public accountImageId: number;

  @ApiModelProperty({ type: Number, required: true })
  public themeId: number;

  @ApiModelProperty({ type: Number, required: true })
  public languageId: number;
}
