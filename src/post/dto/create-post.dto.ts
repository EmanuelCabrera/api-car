import { CreateFileDto } from "src/file/dto/createFile.dto";

export class CreatePostDto {
    title: string;
    content: string;
    published: boolean;
    createAt?: Date;
    expiredAt?: Date;
    authorId: number;
    carId:number;
    brandId:number;
    files:CreateFileDto[]
}