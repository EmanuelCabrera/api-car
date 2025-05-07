import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from '@prisma/client';
import { ICarRepository, CAR_REPOSITORY } from './interfaces/car-repository.interface';
import { CAR_ERRORS } from './constants/car.constants';

@Injectable()
export class CarService {
  constructor(
    @Inject(CAR_REPOSITORY)
    private carRepository: ICarRepository
  ) {}
  
  async create(createCarDto: CreateCarDto): Promise<Car> {
    createCarDto.model = new Date(createCarDto.model);
    try {
      return await this.carRepository.create(createCarDto);
    } catch (error) {
      throw new HttpException(
        error.code === 'P2002' ? CAR_ERRORS.ALREADY_EXISTS : error,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async findAll(page = 1, limit = 10): Promise<Car[]> {
    return await this.carRepository.findAll(page, limit);
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carRepository.findById(id);
    if (!car) {
      throw new HttpException(CAR_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.carRepository.findById(id);
    if (!car) {
      throw new HttpException(CAR_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return await this.carRepository.update(id, updateCarDto);
  }

  async remove(id: number): Promise<Car> {
    const car = await this.carRepository.findById(id);
    if (!car) {
      throw new HttpException(CAR_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return await this.carRepository.delete(id);
  }
}
