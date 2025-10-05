import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateVersionDto {
    @IsString() 
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    carId: number;
}
