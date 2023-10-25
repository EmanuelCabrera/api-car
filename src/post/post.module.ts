import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService,FileService]
})
export class PostModule {}
