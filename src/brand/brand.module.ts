import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { PrismaService } from '../prisma/prisma.service';
import { BRAND_REPOSITORY } from './interfaces/brand.interface';
import { PrismaBrandRepository } from './repositories/brand.repository';

@Module({
  controllers: [BrandController],
  providers: [BrandService, 
    PrismaService,
    {
      provide: BRAND_REPOSITORY,
      useClass: PrismaBrandRepository
    }
  ],
  exports: [BrandService]
})
export class BrandModule {
  
}
