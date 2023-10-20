import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [UserModule, BrandModule, JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
