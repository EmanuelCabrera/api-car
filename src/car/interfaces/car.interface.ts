import { Car } from '@prisma/client';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';

export const CAR_REPOSITORY = 'CAR_REPOSITORY';

export interface ICarRepository {
  create(data: CreateCarDto): Promise<Car>;
  findAll(page: number, limit: number): Promise<Car[]>;
  findById(id: number): Promise<Car | null>;
  update(id: number, data: UpdateCarDto): Promise<Car>;
  delete(id: number): Promise<Car>;
} 