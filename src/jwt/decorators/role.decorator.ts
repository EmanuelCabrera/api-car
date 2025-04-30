import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/roles.enum';

export const Role = (...roles: UserRole[]) => SetMetadata('role', roles);
