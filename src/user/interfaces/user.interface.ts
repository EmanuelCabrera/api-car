import { User } from "@prisma/client";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
    create(data: CreateUserDto): Promise<User>;
    findAll(page: number, limit: number): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    update(id: number, data: UpdateUserDto): Promise<User>;
    delete(id: number): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
