import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IBrandRepository } from '../interfaces/brand.interface';
import { Brand } from '@prisma/client';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

@Injectable()
export class PrismaBrandRepository implements IBrandRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBrandDto): Promise<Brand> {
    return await this.prisma.brand.create({ data });
  }

  async findAll(page: number, limit: number): Promise<Brand[]> {
    const skip = (page - 1) * limit;
    return await this.prisma.brand.findMany({
      skip,
      take: limit,
      orderBy: {
        id: 'desc'
      } 
    });
  }

  async findById(id: number): Promise<Brand | null> {
    return await this.prisma.brand.findUnique({ where: { id } });
  } 

  async update(id: number, data: UpdateBrandDto): Promise<Brand> {
    return await this.prisma.brand.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Brand> {
    return await this.prisma.brand.delete({ where: { id } });
  }
}
