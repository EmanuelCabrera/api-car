import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { JwtModule } from './jwt/jwt.module';
import { CarModule } from './car/car.module';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma/prisma.service';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { VersionModule } from './version/version.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    BrandModule,
    JwtModule,
    CarModule,
    PostModule,
    FileModule,
    AuthModule,
    VersionModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
