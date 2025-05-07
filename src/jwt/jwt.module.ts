import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from './jwt.service';
import { AuthController } from './jwt.controller'
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { USER_REPOSITORY } from '../user/interfaces/user.interface';
import { PrismaUserRepository } from '../user/repositories/user.repository';


@Module({
  controllers: [AuthController],
  providers: [
    JwtService, 
    UserService, 
    PrismaService,
    Reflector,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository
    }

  ],
  exports: [JwtService]
})
export class JwtModule {}