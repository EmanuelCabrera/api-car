import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { IUserRepository } from "../interfaces/user.interface";
import { User } from "@prisma/client";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto): Promise<User> {
        return await this.prisma.user.create({ data });
    }
    
    async findAll(page: number, limit: number): Promise<User[]> {
        const skip = (page - 1) * limit;
        return await this.prisma.user.findMany({
            skip: skip,
            take: limit
        });
    }

    async findById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({ where: { id } });
    }
    
    async update(id: number, data: UpdateUserDto): Promise<User> {
        return await this.prisma.user.update({ where: { id }, data });
    }

    async delete(id: number): Promise<User> {
        return await this.prisma.user.delete({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({ where: { email } });
    }
}
