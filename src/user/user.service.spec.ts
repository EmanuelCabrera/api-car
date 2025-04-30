import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);

    // Mock hashPassword to return the same password for testing
    jest.spyOn(service, 'hashPassword').mockImplementation(async (password) => password);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test',
        surname: 'User',
        role: 'USER',
      };

      const expectedUser = {
        id: 1,
        email: createUserDto.email,
        password: createUserDto.password,
        name: createUserDto.name,
        surname: createUserDto.surname,
        role: createUserDto.role,
      };

      mockPrismaService.user.create.mockResolvedValue(expectedUser);

      const result = await service.create(createUserDto);
      expect(result).toEqual(expectedUser);
      expect(service.hashPassword).toHaveBeenCalledWith(createUserDto.password);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: createUserDto,
      });
    });

    it('should throw an exception when email is already in use', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test',
        surname: 'User',
        role: 'USER',
      };

      mockPrismaService.user.create.mockRejectedValue({ code: 'P2002' });

      await expect(service.create(createUserDto)).rejects.toThrow(
        new HttpException('Email is already in use', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: 1,
          email: 'user1@example.com',
          password: 'hashedPassword1',
          name: 'User',
          surname: 'One',
          role: 'USER',
        },
        {
          id: 2,
          email: 'user2@example.com',
          password: 'hashedPassword2',
          name: 'User',
          surname: 'Two',
          role: 'USER',
        },
      ];

      mockPrismaService.user.findMany.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(mockPrismaService.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test',
        surname: 'User',
        role: 'USER',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'updated@example.com',
        password: 'newPassword',
        name: 'Updated',
        surname: 'User',
        role: 'ADMIN',
      };

      const existingUser: User = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test',
        surname: 'User',
        role: 'USER',
      };

      const updatedUser = {
        ...existingUser,
        ...updateUserDto,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(existingUser);
      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(service.hashPassword).toHaveBeenCalledWith(updateUserDto.password);
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUserDto,
      });
    });

    it('should throw an exception when user not found', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'updated@example.com',
        password: 'newPassword',
        name: 'Updated',
        surname: 'User',
        role: 'ADMIN',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.update(999, updateUserDto)).rejects.toThrow(
        new HttpException('User not exist', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('userLogin', () => {
    it('should login a user with correct credentials', async () => {
      const findUserDto: FindUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user: User = {
        id: 1,
        email: findUserDto.email,
        password: 'hashedPassword',
        name: 'Test',
        surname: 'User',
        role: 'USER',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);
      jest.spyOn(service, 'comparePasswords').mockResolvedValue(true);

      const result = await service.userLogin(findUserDto);
      expect(result).toEqual(user);
      expect(service.comparePasswords).toHaveBeenCalledWith(
        findUserDto.password,
        user.password,
      );
    });

    it('should throw an exception when user not found', async () => {
      const findUserDto: FindUserDto = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.userLogin(findUserDto)).rejects.toThrow(
        new HttpException('User not exist!!', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw an exception when password is incorrect', async () => {
      const findUserDto: FindUserDto = {
        email: 'test@example.com',
        password: 'wrongPassword',
      };

      const user: User = {
        id: 1,
        email: findUserDto.email,
        password: 'hashedPassword',
        name: 'Test',
        surname: 'User',
        role: 'USER',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);
      jest.spyOn(service, 'comparePasswords').mockResolvedValue(false);

      await expect(service.userLogin(findUserDto)).rejects.toThrow(
        new HttpException('The password is incorrect!!', HttpStatus.NOT_FOUND),
      );
    });
  });
});
