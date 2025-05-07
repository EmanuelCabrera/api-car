import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { FindUserDto } from './dto/find-user.dto';
import { IUserRepository, USER_REPOSITORY } from './interfaces/user.interface';
import { USER_ERRORS } from './constants/user.constant';
@Injectable()
export class UserService {
  
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: IUserRepository,
  ){}

  async create(createUserDto: CreateUserDto):Promise<User> {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    try { 
      const newUser = await this.userRepository.create(createUserDto);
      return newUser;
    } catch (error) {
      this.handleError(error.code)
    }
  }

  async findAll(page: number, limit: number):Promise<User[]> {
    return await this.userRepository.findAll(page, limit)
  }

  async findOne(id: number):Promise<User> { 
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new HttpException(USER_ERRORS.NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpException(USER_ERRORS.NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    updateUserDto.password = await this.hashPassword(updateUserDto.password);
    return await this.userRepository.update(id, updateUserDto)
  }

  async remove(id: number):Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpException(USER_ERRORS.NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.delete(id) 
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  handleError(error: string){
    if (error == 'P2002') {
        throw new HttpException(USER_ERRORS.ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    }
  }
  
  async userLogin(userDto: FindUserDto) {
    const user = await this.userRepository.findByEmail(userDto.email);
    if (!user) {
      throw new HttpException(USER_ERRORS.NOT_FOUND,HttpStatus.NOT_FOUND);
    }
    const match = await this.comparePasswords(userDto.password, user.password);
    if (match) {
         return user;     
    }else{
      throw new HttpException(USER_ERRORS.INVALID_PASSWORD,HttpStatus.NOT_FOUND);
    }
  }

}
