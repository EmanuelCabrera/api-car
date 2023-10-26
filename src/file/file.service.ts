import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFileDto } from './dto/createFile.dto';
import { File } from '@prisma/client';

@Injectable()
export class FileService {
    constructor(private prisma:PrismaService){}

    async create(file: Express.Multer.File):Promise<File>{
        try {
            console.log(file);
            return await this.prisma.file.create({
                data:{
                    name:file.filename,
                    base64: file.destination
                }
            });
        } catch (error) {
            throw new HttpException(error,HttpStatus.BAD_REQUEST);
        }
    }

    async assignPostId(fileDto: CreateFileDto):Promise<File>{
        try {
            return this.prisma.file.update({where:{id:fileDto.fileId},data:{postId:fileDto.postId}})
        } catch (error) {
            throw new HttpException('Not assign post id',HttpStatus.BAD_REQUEST);
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
