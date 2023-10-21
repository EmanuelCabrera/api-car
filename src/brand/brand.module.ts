import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtMiddleware } from 'src/jwt/jwt.middleware';
import { JwtService } from 'src/jwt/jwt.service';


@Module({
  controllers: [BrandController],
  providers: [BrandService, PrismaService, JwtService]
})
export class BrandModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('brand');
  }
}
