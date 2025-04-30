import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFileDto } from '../file/dto/createFile.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, private fileservice: FileService){}

  async create(createPostDto: CreatePostDto):Promise<Post> {
    createPostDto.validDate = new Date();
    createPostDto.validDate.setDate(createPostDto.validDate.getDate() + 10);
    try {
      const post = await this.prisma.post.create(
        {
          data:
          {
            title:createPostDto.title,
            content:createPostDto.content,
            published:createPostDto.published,
            authorId:createPostDto.authorId,
            brandId:createPostDto.brandId,
            carId:createPostDto.carId,
            validDate:createPostDto.validDate
          }
        });
      await this.assignFileByPost(post.id, createPostDto.files);
      return post;
    } catch (error) {
      console.log(error);
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
      const post = await this.prisma.post.delete({where: {id}});
      this.fileservice.removeFileByPostId(post.id);
      return post;
    } catch (error) {
      throw new HttpException("Post not exist!!",HttpStatus.NOT_FOUND);
    }
  }

  async assignFileByPost(postId: number, createFilesDto: CreateFileDto[]):Promise<File[]>{
    let files = [];
    createFilesDto.forEach(fileDto => {
      fileDto.postId = postId;
      const file = this.fileservice.assignPostId(fileDto);
      files.push(file);
    });

    return files;
  }
}
