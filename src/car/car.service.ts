import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService){}
  
 async create(createCarDto: CreateCarDto):Promise<Car> {
  
    createCarDto.model = new Date(createCarDto.model);
    console.log(createCarDto);
    try {
      return await this.prisma.car.create({data:createCarDto});
    } catch (error) {
      throw new HttpException(error.code == 'P2002'? "Brand already exist!!":error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll():Promise<Car[]> {
    return await this.prisma.car.findMany();
  }

  async findOne(id: number):Promise<Car> {
    const car = await this.prisma.car.findUnique({where:{id}})
    if (!car) {
      throw new HttpException("Car not exist!!",HttpStatus.NOT_FOUND);
    }
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto):Promise<Car> {
    const car = await this.findOne(id)
    if (!car) {
      throw new HttpException("Car not exist!!",HttpStatus.NOT_FOUND);
    }
    return await this.prisma.car.update({where:{id}, data:updateCarDto});
  }

  async remove(id: number):Promise<Car> {
    const car = await this.findOne(id);
    if (!car) {
      throw new HttpException("Car not exist!!",HttpStatus.NOT_FOUND);
    }
    return await this.prisma.car.delete({where:{id}});
  }
}
