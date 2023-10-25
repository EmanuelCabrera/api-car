import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFileDto } from './dto/createFile.dto';
import { File } from '@prisma/client';

@Injectable()
export class FileService {
    constructor(private prisma:PrismaService){}

    async create(createFileDto: CreateFileDto):Promise<File>{
        try {
            return await this.prisma.file.create({data:createFileDto});
        } catch (error) {
            throw new HttpException(error,HttpStatus.BAD_REQUEST);
        }
    }

    async findAllByPostId(postId: number):Promise<File[]>{
        try {
            return await this.prisma.file.findMany({where:{postId:postId}});
        } catch (error) {
            throw new HttpException("Not existe files in this post",HttpStatus.NOT_FOUND);
        }
    }
}
