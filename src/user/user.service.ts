import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  
  constructor(private prisma: PrismaService){
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(createUserDto: CreateUserDto):Promise<User> {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    try {
      const newUser = await this.prisma.user.create({
        data:createUserDto
      });
      return newUser;
    } catch (error) {
      this.handleError(error.code)
    }
  }

  async findAll():Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  async findOne(id: number):Promise<User> {
    return await this.prisma.user.findUnique({where:{id}})
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<User> {
    const user = await this.prisma.user.findUnique({where:{id}});
    if (!user) {
      throw new HttpException('User not exist', HttpStatus.BAD_REQUEST);
    }
    updateUserDto.password = await this.hashPassword(updateUserDto.password);
    return await this.prisma.user.update({
        where:{id},
        data:updateUserDto
    })
  }

  async remove(id: number):Promise<User> {
    return this.prisma.user.delete({where:{id}})
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
        throw new HttpException('Email is already in use', HttpStatus.BAD_REQUEST);
    }
  }
  
  async userLogin(userDto: FindUserDto) {
    const user = await this.prisma.user.findUnique({where:{email:userDto.email}});
    if (!user) {
      throw new HttpException('User not exist!!',HttpStatus.NOT_FOUND);
    }
    const match = await this.comparePasswords(userDto.password, user.password);
    if (match) {
         return user;     
    }else{
      throw new HttpException('The password is incorrect!!',HttpStatus.NOT_FOUND);
    }
  }

}
