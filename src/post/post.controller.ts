import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Role } from '../jwt/decorators/role.decorator';
import { UserRole } from '../jwt/enums/roles.enum';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@/jwt/guards/role.guard';
import { Public } from '@/jwt/decorators/public.decorator';

@ApiTags('Publicaciones')
@ApiBearerAuth()
@Controller('post')
@UseGuards(JwtAuthGuard, RoleGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER)
  @ApiOperation({ summary: 'Crear una nueva publicación' })
  @ApiResponse({ status: 201, description: 'La publicación ha sido creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 403, description: 'No autorizado.' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Obtener todas las publicaciones' })
  @ApiResponse({ status: 200, description: 'Lista de publicaciones obtenida exitosamente.' })
  findAll() {
    return this.postService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una publicación por ID' })
  @ApiResponse({ status: 200, description: 'Publicación encontrada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER)
  @ApiOperation({ summary: 'Actualizar una publicación' })
  @ApiResponse({ status: 200, description: 'Publicación actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada.' })
  @ApiResponse({ status: 403, description: 'No autorizado.' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @Role(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Eliminar una publicación' })
  @ApiResponse({ status: 200, description: 'Publicación eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada.' })
  @ApiResponse({ status: 403, description: 'No autorizado.' })
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
