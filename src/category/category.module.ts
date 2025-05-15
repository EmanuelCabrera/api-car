import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CATEGORY_REPOSITORY } from './interfaces/category.interface';
import { PrismaCategoryRepository } from './repositories/category.repository';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    PrismaService,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: PrismaCategoryRepository
    }
  ],
  exports: [CategoryService]
})
export class CategoryModule {}
