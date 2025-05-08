import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { PrismaService } from '../prisma/prisma.service';
import { FILE_REPOSITORY } from './interfaces/file.interface';
import { PrismaFileRepository } from './repositories/file.repository';

@Module({
  controllers: [FileController],
  providers:[FileService, PrismaService, {
    provide: FILE_REPOSITORY,
    useClass: PrismaFileRepository
  }] ,
  exports:[FileService]
})
export class FileModule {}
