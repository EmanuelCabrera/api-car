import { CreateFileDto } from "src/file/dto/createFile.dto";

export class CreatePostDto {
    title: string;
    content: string;
    published: boolean;
    validDate?: Date;
    authorId: number;
    files:CreateFileDto[]
}