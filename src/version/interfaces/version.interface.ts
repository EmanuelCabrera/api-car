import { Version } from "@prisma/client";
import { CreateVersionDto } from "../dto/create-version.dto";
import { UpdateVersionDto } from "../dto/update-version.dto";

export const VERSION_REPOSITORY = 'VERSION_REPOSITORY';

export interface IVersionRepository {
    create(createVersionDto: CreateVersionDto): Promise<Version>;
    findAll( page: number, limit: number): Promise<Version[]>;
    findOne(id: number): Promise<Version>;
    findAllByCarId(carId: number): Promise<Version[]>;
    update(id: number, updateVersionDto: UpdateVersionDto): Promise<Version>;
    remove(id: number): Promise<Version>;
}