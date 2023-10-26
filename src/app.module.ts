import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { JwtModule } from './jwt/jwt.module';
import { CarModule } from './car/car.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { JwtService } from './jwt/jwt.service';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './jwt/guards/role.guard';
import { PostModule } from './post/post.module';
import { FileService } from './file/file.service';
import { PrismaService } from './prisma/prisma.service';
import { FileModule } from './file/file.module';

@Module({
  imports: [UserModule, BrandModule, JwtModule, CarModule, PostModule, FileModule],
  controllers: [AppController],
  providers: [AppService,PrismaService, JwtService,
    {provide: APP_GUARD,
      useClass: RoleGuard,},
    FileService
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('brand','car','post');
  }
}
