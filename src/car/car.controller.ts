import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Role } from 'src/jwt/decorators/role.decorator';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @Role('Admin', 'Manager')
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  @Role('Admin', 'Manager')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @Role('Admin', 'Manager')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
