import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../enums/roles.enum';

const matchRoles = (roles: UserRole[], userRole: UserRole) => {
  return roles.some(role => role === userRole);
};

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('role', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    
    if (!user || !user.role) {
      throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
    }

    if (matchRoles(roles, user.role)) {
      return true;
    } else {
      throw new HttpException('Insufficient permissions', HttpStatus.FORBIDDEN);
    }
  }
}
