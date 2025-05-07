import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Role } from '../jwt/decorators/role.decorator';
import { UserRole } from '../jwt/enums/roles.enum';
import { Public } from '@/jwt/decorators/public.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@/jwt/guards/role.guard';


@Controller('brand')
@UseGuards(JwtAuthGuard, RoleGuard)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Public()
  @Get()
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
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @Patch(':id')
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
