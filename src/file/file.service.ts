import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFileDto } from './dto/createFile.dto';
import { File } from '@prisma/client';

@Injectable()
export class FileService {
    constructor(private prisma:PrismaService){}

    async create(file: Express.Multer.File):Promise<File>{
        try {
            if (!file) {
                throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
            }
            
            return await this.prisma.file.create({
                data: {
                    name: file.filename,
                    base64: file.path // Usamos path en lugar de destination
                }
            });
        } catch (error) {
            throw new HttpException(error.message || 'Error creating file', HttpStatus.BAD_REQUEST);
        }
    }

    async assignPostId(fileDto: CreateFileDto):Promise<File | null>{
        try {
            const file = await this.prisma.file.findUnique({
                where: { id: fileDto.fileId }
            });
            
            if (!file) {
                console.log(`File with id ${fileDto.fileId} not found`);
                return null;
            }

            return this.prisma.file.update({
                where: { id: fileDto.fileId },
                data: { postId: fileDto.postId }
            });
        } catch (error) {
            console.error('Error assigning post to file:', error);
            return null;
        }
    }

    async assignFileByPost(postId: number, createFilesDto: CreateFileDto[]):Promise<File[]>{
        const files = [];
        for (const fileDto of createFilesDto) {
            fileDto.postId = postId;
            const file = await this.assignPostId(fileDto);
            if (file) {
                files.push(file);
            }
        }
        return files;
    }

    async findAllByPostId(postId: number):Promise<File[]>{
        try {
            return await this.prisma.file.findMany({where:{postId:postId}});
        } catch (error) {
            throw new HttpException("Not existe files in this post",HttpStatus.NOT_FOUND);
        }
    }

    async removeFileByPostId(postId: number):Promise<File[]>{
        const files = await this.findAllByPostId(postId);
        files.forEach(async (file) => {
            try {
                await this.prisma.file.delete({where:{id:file.id}});
            } catch (error) {
                throw new HttpException("file not exist!!",HttpStatus.NOT_FOUND);
            }
        });
        return files;
    }
}
