import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Role } from '../jwt/decorators/role.decorator';
import { UserRole } from '../jwt/enums/roles.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../jwt/guards/role.guard';
import { Public } from '@/jwt/decorators/public.decorator';

@Controller('car')
@UseGuards(JwtAuthGuard, RoleGuard)
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Public()
  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const pageNumber = page ? parseInt(page) : 1;
    const limitNumber = limit ? parseInt(limit) : 10;
    return this.carService.findAll(pageNumber, limitNumber);
  }

  @Public()
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
