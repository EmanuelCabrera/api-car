import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from '../file/file.service';
import { PostExpirationService } from './post-expiration.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MailModule
  ],
  controllers: [PostController],
  providers: [PostService, PrismaService, FileService, PostExpirationService],
})
export class PostModule {}
