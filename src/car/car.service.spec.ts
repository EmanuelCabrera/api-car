import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from './car.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Car } from '@prisma/client';
import { CreateCarDto } from './dto/create-car.dto';

describe('CarService', () => {
  let service: CarService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    car: {
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
        CarService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CarService>(CarService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a car', async () => {
      const createCarDto: CreateCarDto = {
        name: 'Corolla',
        brandId: 1,
        model: new Date('2020-01-01'),
      };

      const expectedCar = {
        id: 1,
        ...createCarDto,
      };

      mockPrismaService.car.create.mockResolvedValue(expectedCar);

      const result = await service.create(createCarDto);
      expect(result).toEqual(expectedCar);
      expect(mockPrismaService.car.create).toHaveBeenCalledWith({
        data: createCarDto,
      });
    });

    it('should throw an exception when car already exists', async () => {
      const createCarDto: CreateCarDto = {
        name: 'Corolla',
        brandId: 1,
        model: new Date('2020-01-01'),
      };

      mockPrismaService.car.create.mockRejectedValue({ code: 'P2002' });

      await expect(service.create(createCarDto)).rejects.toThrow(
        new HttpException('Car already exist!!', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of cars', async () => {
      const cars: Car[] = [
        {
          id: 1,
          name: 'Corolla',
          brandId: 1,
          model: new Date('2020-01-01'),
        },
        {
          id: 2,
          name: 'Civic',
          brandId: 2,
          model: new Date('2021-01-01'),
        },
      ];

      mockPrismaService.car.findMany.mockResolvedValue(cars);

      const result = await service.findAll();
      expect(result).toEqual(cars);
      expect(mockPrismaService.car.findMany).toHaveBeenCalled();
    });
  });
}); 