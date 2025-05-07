import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { USER_REPOSITORY } from './interfaces/user.interface';
import { PrismaUserRepository } from './repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository
    }
  ],
  exports: [UserService]
})
export class UserModule {}
