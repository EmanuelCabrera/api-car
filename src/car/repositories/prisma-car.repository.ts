import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ICarRepository } from '../interfaces/car-repository.interface';
import { Car } from '@prisma/client';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';

@Injectable()
export class PrismaCarRepository implements ICarRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCarDto): Promise<Car> {
    return await this.prisma.car.create({ data });
  }

  async findAll(page: number, limit: number): Promise<Car[]> {
    const skip = (page - 1) * limit;
    return await this.prisma.car.findMany({
      skip,
      take: limit,
      orderBy: {
        id: 'desc'
      }
    });
  }

  async findById(id: number): Promise<Car | null> {
    return await this.prisma.car.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateCarDto): Promise<Car> {
    return await this.prisma.car.update({
      where: { id },
      data
    });
  }

  async delete(id: number): Promise<Car> {
    return await this.prisma.car.delete({ where: { id } });
  }
} 