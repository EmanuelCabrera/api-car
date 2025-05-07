import { Brand } from '@prisma/client';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

export const BRAND_REPOSITORY = 'BRAND_REPOSITORY';

export interface IBrandRepository {
  create(data: CreateBrandDto): Promise<Brand>;
  findAll(page: number, limit: number): Promise<Brand[]>;
  findById(id: number): Promise<Brand | null>;
  update(id: number, data: UpdateBrandDto): Promise<Brand>;
  delete(id: number): Promise<Brand>;
}

