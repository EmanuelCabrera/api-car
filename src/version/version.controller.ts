import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { VersionService } from './version.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@/jwt/guards/role.guard';
import { UserRole } from '@/jwt/enums/roles.enum';
import { Role } from '@/jwt/decorators/role.decorator';
import { Public } from '@/jwt/decorators/public.decorator';

@Controller('version')
@ApiTags('Versiones')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Post()
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Crear una nueva versión' })
  @ApiResponse({ status: 201, description: 'La versión ha sido creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 403, description: 'No autorizado.' })
  create(@Body() createVersionDto: CreateVersionDto) {
    return this.versionService.create(createVersionDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Obtener todas las versiones' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número de elementos por página' })
  @ApiResponse({ status: 200, description: 'Versiones obtenidas exitosamente.' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const pageNumber = page ? parseInt(page) : 1;
    const limitNumber = limit ? parseInt(limit) : 10;
    return this.versionService.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Obtener una versión por ID' })
  @ApiResponse({ status: 200, description: 'Versión obtenida exitosamente.' })
  @ApiResponse({ status: 404, description: 'Versión no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.versionService.findOne(+id);
  }

  @Get('car/:id')
  @Public()
  @ApiOperation({ summary: 'Obtener todas las versiones de un coche' })
  @ApiResponse({ status: 200, description: 'Versiones obtenidas exitosamente.' })
  @ApiResponse({ status: 404, description: 'No se encontraron versiones para el coche especificado.' })
  findAllByCarId(@Param('id') id: string) {
    return this.versionService.findAllByCarId(+id);
  }
  

  @Patch(':id')
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Actualizar una versión por ID' })
  @ApiResponse({ status: 200, description: 'Versión actualizada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 403, description: 'No autorizado.' })
  update(@Param('id') id: string, @Body() updateVersionDto: UpdateVersionDto) {
    return this.versionService.update(+id, updateVersionDto);
  }

  @Delete(':id')
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Eliminar una versión por ID' })
  @ApiResponse({ status: 200, description: 'Versión eliminada exitosamente.' })
  @ApiResponse({ status: 403, description: 'No autorizado.' })
  remove(@Param('id') id: string) {
    return this.versionService.remove(+id);
  }
}
