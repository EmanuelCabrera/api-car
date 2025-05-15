import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';
import { CATEGORY_REPOSITORY, ICategoryRepository } from './interfaces/category.interface';
import { CATEGORY_ERRORS } from './constants/category.constants';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private categoryRepository: ICategoryRepository
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      return await this.categoryRepository.create(createCategoryDto);
    } catch (error) {
      throw new HttpException(
        error.code === 'P2002' ? CATEGORY_ERRORS.ALREADY_EXISTS : error,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async findAll(page = 1, limit = 10): Promise<Category[]> {
    return await this.categoryRepository.findAll(page, limit);
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new HttpException(CATEGORY_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new HttpException(CATEGORY_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number): Promise<Category> {
    try {
      return await this.categoryRepository.delete(id);
    } catch (error) {
      throw new HttpException(CATEGORY_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
