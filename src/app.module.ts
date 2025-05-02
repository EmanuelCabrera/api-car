import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { JwtModule } from './jwt/jwt.module';
import { CarModule } from './car/car.module';
import { PostModule } from './post/post.module';
import { FileService } from './file/file.service';
import { PrismaService } from './prisma/prisma.service';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),UserModule, BrandModule, JwtModule, CarModule, PostModule, FileModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, FileService],
})
export class AppModule {}
