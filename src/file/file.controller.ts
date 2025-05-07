import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from './helpers/file.helper';
import { FileService } from './file.service';
import { Public } from '@/jwt/decorators/public.decorator';
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
    @UseInterceptors(FileInterceptor('file',{
        storage:diskStorage({
            destination:'./upload',
            filename:renameImage
        }),
        fileFilter:fileFilter
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File){
        this.filseService.create(file);
    }
}
