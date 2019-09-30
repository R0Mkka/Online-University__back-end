import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

import { IUserLikePayload } from '@models/auth.models';
import { Roles } from '../models/roles.models';

@Injectable()
export class NoStudentsGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext,
  ): boolean {
    const payload: IUserLikePayload = context.switchToHttp().getRequest().user;

    if (payload.roleId === Roles.Student) {
      throw new ForbiddenException();
    }

    return true;
  }
}
