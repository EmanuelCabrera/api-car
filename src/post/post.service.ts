import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '@prisma/client';
import { CreateFileDto } from '../file/dto/createFile.dto';
import { FileService } from '../file/file.service';
import { IPostRepository, POST_REPOSITORY } from './interfaces/post.interface';
import { POST_ERROR } from './constants/post.constants';


@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY)
    private postRepository: IPostRepository,
    private fileservice: FileService
  ) {}

  async create(createPostDto: CreatePostDto):Promise<Post> {
    createPostDto.createAt = new Date();
    createPostDto.expiredAt = new Date();
    createPostDto.expiredAt.setDate(createPostDto.expiredAt.getDate() + 15);
    try {
      const post = await this.postRepository.create(createPostDto);
      await this.assignFileByPost(post.id, createPostDto.files);
      return post;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.code == 'P2002'? POST_ERROR.POST_ALREADY_EXISTS:error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(page = 1, limit = 10):Promise<Post[]> {
    return await this.postRepository.findAll(page, limit);
  }

  async findOne(id: number):Promise<Post> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new HttpException(POST_ERROR.POST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto):Promise<Post> {
    const post = await this.findOne(id);
    if (!post) {
      throw new HttpException(POST_ERROR.POST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number):Promise<Post> {
    try {
      const post = await this.postRepository.delete(id);
      this.fileservice.removeFileByPostId(post.id);
      return post;
    } catch (error) {
      throw new HttpException(POST_ERROR.POST_NOT_FOUND,HttpStatus.NOT_FOUND);
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
