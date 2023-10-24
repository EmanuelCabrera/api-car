import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService){}

  async create(createPostDto: CreatePostDto):Promise<Post> {
    createPostDto.validDate = new Date();

    try {
      return await this.prisma.post.create({data:createPostDto});
    } catch (error) {
      throw new HttpException(error.code == 'P2002'? "Post already exist!!":error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll():Promise<Post[]> {
    return await this.prisma.post.findMany();
  }

  async findOne(id: number):Promise<Post> {
    const post = await this.prisma.post.findUnique({where:{id}});
    if (!post) {
      throw new HttpException("Post not exist!!", HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto):Promise<Post> {
    const post = await this.findOne(id);
    if (!post) {
      throw new HttpException("Post not exist!!", HttpStatus.NOT_FOUND);
    }
    return await this.prisma.post.update({where:{id},data:updatePostDto});
  }

  async remove(id: number):Promise<Post> {
    try {
      return this.prisma.post.delete({where: {id}});
    } catch (error) {
      throw new HttpException("Post not exist!!",HttpStatus.NOT_FOUND);
    }
  }
}
