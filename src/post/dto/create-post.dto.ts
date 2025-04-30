import { CreateFileDto } from "src/file/dto/createFile.dto";

export class CreatePostDto {
    title: string;
    content: string;
    published: boolean;
    validDate?: Date;
    authorId: number;
    carId:number;
    brandId:number;
    files:CreateFileDto[]
}