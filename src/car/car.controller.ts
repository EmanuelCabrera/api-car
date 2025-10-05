import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Role } from '../jwt/decorators/role.decorator';
import { UserRole } from '../jwt/enums/roles.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../jwt/guards/role.guard';
import { Public } from '@/jwt/decorators/public.decorator';

@ApiTags('Carros')
@ApiBearerAuth()
@Controller('car')
@UseGuards(JwtAuthGuard, RoleGuard)
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Crear un nuevo carro' })
  @ApiResponse({ status: 201, description: 'El carro ha sido creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 403, description: 'No autorizado.' })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Obtener todos los carros' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Límite de resultados por página' })
  @ApiResponse({ status: 200, description: 'Lista de carros obtenida exitosamente.' })
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
  @ApiOperation({ summary: 'Obtener un carro por ID' })
  @ApiResponse({ status: 200, description: 'Carro encontrado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Carro no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Actualizar un carro' })
  @ApiResponse({ status: 200, description: 'Carro actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Carro no encontrado.' })
  @ApiResponse({ status: 403, description: 'No autorizado.' })
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Eliminar un carro' })
  @ApiResponse({ status: 200, description: 'Carro eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Carro no encontrado.' })
  @ApiResponse({ status: 403, description: 'No autorizado.' })
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
