import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { IVersionRepository } from './interfaces/version.interface';
import { VERSION_REPOSITORY } from './interfaces/version.interface';
import { VERSION_ERRORS } from './constants/version.constant';

@Injectable()
export class VersionService {
  constructor(
    @Inject(VERSION_REPOSITORY)
    private versionRepository: IVersionRepository,
  ){}

  create(createVersionDto: CreateVersionDto) {
    try { 
      return this.versionRepository.create(createVersionDto);
    } catch (error) {
      throw new HttpException(
        error.code == 'P2002'? VERSION_ERRORS.ALREADY_EXISTS:error,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  findAll(page: number, limit: number) {
    return this.versionRepository.findAll(page, limit);
  }

  findOne(id: number) {
    const version = this.versionRepository.findOne(id);
    if (!version) {
      throw new HttpException(VERSION_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return version;
  }

  findAllByCarId(carId: number) {
    return this.versionRepository.findAllByCarId(carId);
  }

  update(id: number, updateVersionDto: UpdateVersionDto) {
    const version = this.versionRepository.findOne(id);
    if (!version) {
      throw new HttpException(VERSION_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.versionRepository.update(id, updateVersionDto);
  }

  remove(id: number) {
    const version = this.versionRepository.findOne(id);
    if (!version) {
      throw new HttpException(VERSION_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.versionRepository.remove(id);
  }
}
