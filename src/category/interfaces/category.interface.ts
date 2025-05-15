import { Category } from '@prisma/client';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export const CATEGORY_REPOSITORY = 'CATEGORY_REPOSITORY';

export interface ICategoryRepository {
  create(data: CreateCategoryDto): Promise<Category>;
  findAll(page: number, limit: number): Promise<Category[]>;
  findById(id: number): Promise<Category | null>;
  update(id: number, data: UpdateCategoryDto): Promise<Category>;
  delete(id: number): Promise<Category>;
} 