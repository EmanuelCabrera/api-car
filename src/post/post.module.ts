import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PostExpirationService } from './post-expiration.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from '../mail/mail.module';
import { POST_REPOSITORY } from './interfaces/post.interface';
import { PostRepository } from './repositories/post.repository';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MailModule,
    FileModule
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PrismaService,
    {
      provide: POST_REPOSITORY,
      useClass: PostRepository
    },
    PostExpirationService
  ],
})
export class PostModule {}
