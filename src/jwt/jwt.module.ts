import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from './jwt.service';
import { AuthController } from './jwt.controller'
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleGuard } from './guards/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [
    JwtService, 
    UserService, 
    PrismaService,
    Reflector,
    
  ],
  exports: [JwtService]
})
export class JwtModule {}