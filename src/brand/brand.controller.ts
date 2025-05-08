import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Role } from '../jwt/decorators/role.decorator';
import { UserRole } from '../jwt/enums/roles.enum';
import { Public } from '@/jwt/decorators/public.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@/jwt/guards/role.guard';

@ApiTags('Marcas')
@ApiBearerAuth()
@Controller('brand')
@UseGuards(JwtAuthGuard, RoleGuard)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Crear una nueva marca' })
  @ApiResponse({ status: 201, description: 'La marca ha sido creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 403, description: 'No autorizado.' })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Obtener todas las marcas' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Límite de resultados por página' })
  @ApiResponse({ status: 200, description: 'Lista de marcas obtenida exitosamente.' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const pageNumber = page ? parseInt(page) : 1;
    const limitNumber = limit ? parseInt(limit) : 10;
    return this.brandService.findAll(pageNumber, limitNumber);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una marca por ID' })
  @ApiResponse({ status: 200, description: 'Marca encontrada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Marca no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @Patch(':id')
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Actualizar una marca' })
  @ApiResponse({ status: 200, description: 'Marca actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Marca no encontrada.' })
  @ApiResponse({ status: 403, description: 'No autorizado.' })
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Eliminar una marca' })
  @ApiResponse({ status: 200, description: 'Marca eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Marca no encontrada.' })
  @ApiResponse({ status: 403, description: 'No autorizado.' })
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
