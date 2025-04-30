import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      const expectedUser: User = {
        id: 1,
        ...createUserDto,
        password: 'hashedPassword',
      };

      mockUserService.create.mockResolvedValue(expectedUser);

      const result = await controller.create(createUserDto);
      expect(result).toEqual(expectedUser);
      expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
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

      mockUserService.findAll.mockResolvedValue(users);

      const result = await controller.findAll();
      expect(result).toEqual(users);
      expect(mockUserService.findAll).toHaveBeenCalled();
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

      mockUserService.findOne.mockResolvedValue(user);

      const result = await controller.findOne('1');
      expect(result).toEqual(user);
      expect(mockUserService.findOne).toHaveBeenCalledWith(1);
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

      const updatedUser: User = {
        id: 1,
        email: 'updated@example.com',
        ...updateUserDto,
        password: 'hashedPassword',
      };

      mockUserService.update.mockResolvedValue(updatedUser);

      const result = await controller.update('1', updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(mockUserService.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test',
        surname: 'User',
        role: 'USER',
      };

      mockUserService.remove.mockResolvedValue(user);

      const result = await controller.remove('1');
      expect(result).toEqual(user);
      expect(mockUserService.remove).toHaveBeenCalledWith(1);
    });
  });
});
