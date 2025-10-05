import { Post } from '@prisma/client';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

export const POST_REPOSITORY = 'POST_REPOSITORY';


export interface IPostRepository {
    create(data: CreatePostDto): Promise<Post>;
    findAll(page: number, limit: number): Promise<Post[]>;
    findById(id: number): Promise<Post | null>;
    update(id: number, data: UpdatePostDto): Promise<Post>;
    delete(id: number): Promise<Post>;
}
