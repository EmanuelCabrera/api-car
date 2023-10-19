import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { AuthController } from './jwt.controller'
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/service/prisma.service';

@Module({
  controllers:[AuthController],
  providers: [JwtService, UserService, PrismaService]
})
export class JwtModule {}