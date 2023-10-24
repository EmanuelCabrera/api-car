export class CreatePostDto {
    title: string;
    content: string;
    published: boolean;
    validDate?: Date;
    authorId: number;
    // file:[createFileDto]
}