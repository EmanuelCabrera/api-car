import { Test, TestingModule } from '@nestjs/testing';
import { BrandService } from './brand.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Brand } from '@prisma/client';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

describe('BrandService', () => {
  let service: BrandService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    brand: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BrandService>(BrandService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a brand', async () => {
      const createBrandDto: CreateBrandDto = {
        name: 'Toyota',
      };

      const expectedBrand = {
        id: 1,
        ...createBrandDto,
      };

      mockPrismaService.brand.create.mockResolvedValue(expectedBrand);

      const result = await service.create(createBrandDto);
      expect(result).toEqual(expectedBrand);
      expect(mockPrismaService.brand.create).toHaveBeenCalledWith({
        data: createBrandDto,
      });
    });

    it('should throw an exception when brand already exists', async () => {
      const createBrandDto: CreateBrandDto = {
        name: 'Toyota',
      };

      mockPrismaService.brand.create.mockRejectedValue({ code: 'P2002' });

      await expect(service.create(createBrandDto)).rejects.toThrow(
        new HttpException('Brand already exist!!', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of brands', async () => {
      const brands: Brand[] = [
        {
          id: 1,
          name: 'Toyota',
        },
        {
          id: 2,
          name: 'Honda',
        },
      ];

      mockPrismaService.brand.findMany.mockResolvedValue(brands);

      const result = await service.findAll();
      expect(result).toEqual(brands);
      expect(mockPrismaService.brand.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a brand by id', async () => {
      const brand: Brand = {
        id: 1,
        name: 'Toyota',
      };

      mockPrismaService.brand.findUnique.mockResolvedValue(brand);

      const result = await service.findOne(1);
      expect(result).toEqual(brand);
      expect(mockPrismaService.brand.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw an exception when brand not found', async () => {
      mockPrismaService.brand.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        new HttpException('Brand not exist', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update a brand', async () => {
      const updateBrandDto: UpdateBrandDto = {
        name: 'Toyota Updated',
      };

      const existingBrand: Brand = {
        id: 1,
        name: 'Toyota',
      };

      const updatedBrand: Brand = {
        id: 1,
        name: 'Toyota Updated',
      };

      mockPrismaService.brand.findUnique.mockResolvedValue(existingBrand);
      mockPrismaService.brand.update.mockResolvedValue(updatedBrand);

      const result = await service.update(1, updateBrandDto);
      expect(result).toEqual(updatedBrand);
      expect(mockPrismaService.brand.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateBrandDto,
      });
    });

    it('should throw an exception when brand not found', async () => {
      const updateBrandDto: UpdateBrandDto = {
        name: 'Toyota Updated',
      };

      mockPrismaService.brand.findUnique.mockResolvedValue(null);

      await expect(service.update(999, updateBrandDto)).rejects.toThrow(
        new HttpException('Brand not exist', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('remove', () => {
    it('should remove a brand', async () => {
      const brand: Brand = {
        id: 1,
        name: 'Toyota',
      };

      mockPrismaService.brand.delete.mockResolvedValue(brand);

      const result = await service.remove(1);
      expect(result).toEqual(brand);
      expect(mockPrismaService.brand.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw an exception when brand not found', async () => {
      mockPrismaService.brand.delete.mockRejectedValue(new Error());

      await expect(service.remove(999)).rejects.toThrow(
        new HttpException('Brand not exist', HttpStatus.NOT_FOUND),
      );
    });
  });
}); 