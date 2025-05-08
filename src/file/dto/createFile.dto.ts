import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateFileDto {    
    @ApiProperty({
        description: 'Nombre del archivo',
        example: 'imagen.jpg'
    })  
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'ID del archivo',
        example: 1
    })
    @IsNumber()
    fileId:number;

    @ApiProperty({
        description: 'ID del archivo',
        example: 1
    })
    @IsNumber()
    postId:number;

    @ApiProperty({
        description: 'Base64 del archivo',
        example: 'data:image/jpeg;base64,...'
    })
    @IsString()
    @IsOptional()
    base64:string;
}