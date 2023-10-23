import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const matchRoles = (roles, userRoles) => {
  return roles.some(role => role === userRoles);
};

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest() as any;
    const user = req.user;
    if (matchRoles(roles, user.role)){
      return true;
    }else{
      throw new HttpException("Don't have necessary role", HttpStatus.NOT_FOUND);
    }
  }
}
