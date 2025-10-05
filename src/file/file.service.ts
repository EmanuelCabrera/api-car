import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFileDto } from './dto/createFile.dto';
import { File } from '@prisma/client';
import { FILE_REPOSITORY, IFileRepository } from './interfaces/file.interface';
import { FILE_ERRORS } from './constants/file.constants';

@Injectable()
export class FileService {
    constructor(
        private prisma: PrismaService,
        @Inject(FILE_REPOSITORY)
        private fileRepository: IFileRepository
    ) {}

    async create(file: Express.Multer.File): Promise<File> {
        try {
            if (!file) {
                throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
            }
            
            return await this.fileRepository.create({
                name: file.filename,
                base64: file.path,
                fileId: null,
                postId: null
            });
        } catch (error) {
            throw new HttpException(error.message || FILE_ERRORS.FILE_CREATION_ERROR, HttpStatus.BAD_REQUEST);
        }
    }

    async assignPostId(fileDto: CreateFileDto): Promise<File | null> {
        try {
            const file = await this.fileRepository.findById(fileDto.fileId);
            
            if (!file) {
                console.log(`File with id ${fileDto.fileId} not found`);
                return null;
            }

            return this.fileRepository.update(fileDto.fileId, {
                postId: fileDto.postId
            });
        } catch (error) {
            console.error('Error assigning post to file:', error);
            return null;
        }
    }

    async assignFileByPost(postId: number, createFilesDto: CreateFileDto[]): Promise<File[]> {
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

    async findAllByPostId(postId: number): Promise<File[]> {
        try {
            return await this.prisma.file.findMany({where:{postId:postId}});
        } catch (error) {
            throw new HttpException(FILE_ERRORS.FILE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    async removeFileByPostId(postId: number): Promise<File[]> {
        const files = await this.findAllByPostId(postId);
        files.forEach(async (file) => {
            try {
                await this.fileRepository.delete(file.id);
            } catch (error) {
                throw new HttpException(FILE_ERRORS.FILE_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
        });
        return files;
    }
}
