import { Car } from '@prisma/client';

export type CarResponse = {
  success: boolean;
  data?: Car | Car[];
  error?: string;
  message?: string;
};

export type CarQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: keyof Car;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}; 