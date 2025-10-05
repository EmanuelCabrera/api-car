import { Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from './helpers/file.helper';
import { FileService } from './file.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@/jwt/guards/role.guard';
import { UserRole } from '@/jwt/enums/roles.enum';
import { Role } from '@/jwt/decorators/role.decorator';

@Controller('file')
@UseGuards(JwtAuthGuard, RoleGuard)
export class FileController {

    constructor(private readonly filseService: FileService){}

    @Post()
    @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: renameImage
        }),
        fileFilter: fileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024 // 5MB max file size
        }
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File){
        return await this.filseService.create(file);
    }

    @Get(':id')
    @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER)
    async getFilesByPostId(@Param('id') id: string){
        return await this.filseService.findAllByPostId(parseInt(id));
    }
}
