import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { IVersionRepository } from "../interfaces/version.interface";
import { Version } from "@prisma/client";
import { CreateVersionDto } from "../dto/create-version.dto";
import { UpdateVersionDto } from "../dto/update-version.dto";

@Injectable()
export class VersionRepository implements IVersionRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createVersionDto: CreateVersionDto): Promise<Version> {
        return await this.prisma.version.create({ data: createVersionDto });
    }

    async findAll(page: number, limit: number): Promise<Version[]> {
        const skip = (page - 1) * limit;
        return await this.prisma.version.findMany({ skip, take: limit });
    }

    async findOne(id: number): Promise<Version> {
        return await this.prisma.version.findUnique({ where: { id } });
    }

    async update(id: number, data: UpdateVersionDto): Promise<Version> {
        return await this.prisma.version.update({ where: { id }, data });
    }

    async remove(id: number): Promise<Version> {
        return await this.prisma.version.delete({ where: { id } });
    }

    async findAllByCarId(carId: number): Promise<Version[]> {
        return await this.prisma.version.findMany({ where: { carId: carId } });
    }
}