import { Test, TestingModule } from '@nestjs/testing';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from '@prisma/client';

describe('BrandController', () => {
  let controller: BrandController;
  let service: BrandService;

  const mockBrandService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandController],
      providers: [
        {
          provide: BrandService,
          useValue: mockBrandService,
        },
      ],
    }).compile();

    controller = module.get<BrandController>(BrandController);
    service = module.get<BrandService>(BrandService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a brand', async () => {
      const createBrandDto: CreateBrandDto = {
        name: 'Toyota',
      };

      const expectedBrand: Brand = {
        id: 1,
        ...createBrandDto,
      };

      mockBrandService.create.mockResolvedValue(expectedBrand);

      const result = await controller.create(createBrandDto);
      expect(result).toEqual(expectedBrand);
      expect(mockBrandService.create).toHaveBeenCalledWith(createBrandDto);
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

      mockBrandService.findAll.mockResolvedValue(brands);

      const result = await controller.findAll();
      expect(result).toEqual(brands);
      expect(mockBrandService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a brand by id', async () => {
      const brand: Brand = {
        id: 1,
        name: 'Toyota',
      };

      mockBrandService.findOne.mockResolvedValue(brand);

      const result = await controller.findOne('1');
      expect(result).toEqual(brand);
      expect(mockBrandService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a brand', async () => {
      const updateBrandDto: UpdateBrandDto = {
        name: 'Toyota Updated',
      };

      const updatedBrand: Brand = {
        id: 1,
        name: 'Toyota Updated',
      };

      mockBrandService.update.mockResolvedValue(updatedBrand);

      const result = await controller.update('1', updateBrandDto);
      expect(result).toEqual(updatedBrand);
      expect(mockBrandService.update).toHaveBeenCalledWith(1, updateBrandDto);
    });
  });

  describe('remove', () => {
    it('should remove a brand', async () => {
      const brand: Brand = {
        id: 1,
        name: 'Toyota',
      };

      mockBrandService.remove.mockResolvedValue(brand);

      const result = await controller.remove('1');
      expect(result).toEqual(brand);
      expect(mockBrandService.remove).toHaveBeenCalledWith(1);
    });
  });
}); 