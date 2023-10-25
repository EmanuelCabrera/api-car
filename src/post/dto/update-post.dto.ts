import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { CreateFileDto } from 'src/file/dto/createFile.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    title?: string;
    content?: string;
    published?: boolean;
    validDate?: Date;
    carId?: number;
    brandId?: number;
    files?: CreateFileDto[];
}
