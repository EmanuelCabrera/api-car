import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from '@prisma/client'
import { BRAND_REPOSITORY, IBrandRepository } from './interfaces/brand.interface';
import { BRAND_ERRORS } from './constants/brand.constants';
@Injectable()
export class BrandService {
  constructor(
    @Inject(BRAND_REPOSITORY)
    private brandRepository: IBrandRepository
  ){}

  async create(createBrandDto: CreateBrandDto):Promise<Brand> {

    try {
      return await this.brandRepository.create(createBrandDto)
    } catch (error) {
      throw new HttpException(
        error.code == 'P2002'? BRAND_ERRORS.ALREADY_EXISTS:error,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async findAll(page = 1, limit = 10):Promise<Brand[]> {
    return await this.brandRepository.findAll(page, limit);
  }

  async findOne(id: number):Promise<Brand> {
    const brand = await this.brandRepository.findById(id);
    if (!brand) {
      throw new HttpException(BRAND_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto):Promise<Brand> {
    const brand =  await this.brandRepository.findById(id);
    if (!brand) {
      throw new HttpException(BRAND_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return await this.brandRepository.update(id, updateBrandDto);
  }

  async remove(id: number):Promise<Brand> {
    try {
      return await this.brandRepository.delete(id);
    } catch (error) {
      throw new HttpException(BRAND_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
