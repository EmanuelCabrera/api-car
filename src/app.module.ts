import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { JwtModule } from './jwt/jwt.module';
import { CarModule } from './car/car.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [UserModule, BrandModule, JwtModule, CarModule],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('brand','car');
  }
}
