import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { File } from '@prisma/client';
import { CreateFileDto } from '../dto/createFile.dto';
import { UpdateFileDto } from '../dto/updateFile.dto';
import { IFileRepository } from '../interfaces/file.interface';

@Injectable()
export class PrismaFileRepository implements IFileRepository {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateFileDto): Promise<File> {
        return this.prisma.file.create({
            data: {
                name: data.name,
                base64: data.base64,
                postId: data.postId
            }
        });
    }

    async findAll(page: number, limit: number): Promise<File[]> {
        return this.prisma.file.findMany({
            skip: (page - 1) * limit,
            take: limit
        });
    }

    async findById(id: number): Promise<File | null> {
        return this.prisma.file.findUnique({
            where: { id }
        });
    }

    async delete(id: number): Promise<File> {
        return this.prisma.file.delete({
            where: { id }
        });
    }

    async update(id: number, data: UpdateFileDto): Promise<File> {
        return this.prisma.file.update({
            where: { id },
            data
        });
    }
}