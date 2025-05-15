import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ICategoryRepository } from '../interfaces/category.interface';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    return await this.prisma.category.create({ data });
  }

  async findAll(page: number, limit: number): Promise<Category[]> {
    const skip = (page - 1) * limit;
    return await this.prisma.category.findMany({
      skip,
      take: limit,
      orderBy: {
        id: 'desc'
      } 
    });
  }

  async findById(id: number): Promise<Category | null> {
    return await this.prisma.category.findUnique({ where: { id } });
  } 

  async update(id: number, data: UpdateCategoryDto): Promise<Category> {
    return await this.prisma.category.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Category> {
    return await this.prisma.category.delete({ where: { id } });
  }
} 