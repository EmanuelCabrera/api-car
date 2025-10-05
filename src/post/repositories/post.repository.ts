import { Injectable } from '@nestjs/common';
import { IPostRepository } from '../interfaces/post.interface';
import { Post } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostRepository implements IPostRepository {
    constructor(private prisma: PrismaService) {}

    async create(data: CreatePostDto): Promise<Post> {
        return this.prisma.post.create({
            data:
            {
                title:data.title,
                content:data.content,
                published:data.published,
                authorId:data.authorId,
                brandId:data.brandId,
                carId:data.carId,
                expiredAt:data.expiredAt,
                createAt:data.createAt
            }
        });
    }       

    async findAll(page: number, limit: number): Promise<Post[]> {
        const skip = (page - 1) * limit;
        return this.prisma.post.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc',
            },
        });
    }
    

    async findById(id: number): Promise<Post | null> {
        return this.prisma.post.findUnique({ where: { id } });
    }

    async update(id: number, data: UpdatePostDto): Promise<Post> {
        return this.prisma.post.update({
            where: { id },
            data,
        });
    }       

    async delete(id: number): Promise<Post> {
        return this.prisma.post.delete({ where: { id } });
    }

}
