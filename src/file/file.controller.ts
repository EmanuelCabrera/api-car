import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from './helpers/file.helper';
import { FileService } from './file.service';

@Controller('file')
export class FileController {

    constructor(private readonly filseService: FileService){}
    @Post()
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
