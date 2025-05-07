import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaCarRepository } from './repositories/prisma-car.repository';
import { CAR_REPOSITORY } from './interfaces/car-repository.interface';

@Module({
  controllers: [CarController],
  providers: [
    CarService,
    PrismaService,
    {
      provide: CAR_REPOSITORY,
      useClass: PrismaCarRepository
    }
  ],
  exports: [CarService]
})
export class CarModule {}
