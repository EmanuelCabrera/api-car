import { File } from '@prisma/client';
import { CreateFileDto } from '../dto/createFile.dto';
import { UpdateFileDto } from '../dto/updateFile.dto';

export const FILE_REPOSITORY = 'FILE_REPOSITORY';

export interface IFileRepository {
    create(data: CreateFileDto): Promise<File>;
    findAll(page: number, limit: number): Promise<File[]>;
    findById(id: number): Promise<File | null>;
    delete(id: number): Promise<File>;
    update(id: number, data: UpdateFileDto): Promise<File>;
}
