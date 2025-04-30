import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Role } from '../jwt/decorators/role.decorator';
import { UserRole } from '../jwt/enums/roles.enum';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @Role(UserRole.ADMIN, UserRole.MANAGER)
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
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
