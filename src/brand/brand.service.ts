import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from '@prisma/client'
import { PrismaService } from '../service/prisma.service';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService){}

  async create(createBrandDto: CreateBrandDto):Promise<Brand> {
    try {
      return await this.prisma.brand.create({data:createBrandDto})
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll():Promise<Brand[]> {
    return await this.prisma.brand.findMany();
  }

  async findOne(id: number):Promise<Brand> {
    const brand = await this.prisma.brand.findUnique({where:{id}});
    if (!brand) {
      throw new HttpException("Brand not exist", HttpStatus.NOT_FOUND);
    }
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto):Promise<Brand> {
    const brand =  await this.prisma.brand.findUnique({where:{id}});
    if (!brand) {
      throw new HttpException("Brand not exist", HttpStatus.NOT_FOUND);
    }
    return await this.prisma.brand.update({where:{id},data:updateBrandDto});
  }

  async remove(id: number):Promise<Brand> {
    try {
      return await this.prisma.brand.delete({where:{id}});
    } catch (error) {
      throw new HttpException("Brand not exist", HttpStatus.NOT_FOUND);
    }
  }
}
