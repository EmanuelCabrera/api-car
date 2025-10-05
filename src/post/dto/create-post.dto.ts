import { CreateFileDto } from "src/file/dto/createFile.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsArray } from "class-validator";


export class CreatePostDto {
    @ApiProperty({
        description: 'Título de la publicación',
        example: 'Publicación de prueba'
    })
    @IsString()
    @IsNotEmpty()   
    title: string;

    @ApiProperty({
        description: 'Contenido de la publicación',
        example: 'Contenido de la publicación'
    })
    @IsString()
    content: string;

    @ApiProperty({
        description: 'Fecha de publicación',
        example: '2021-01-01'
    })
    @IsBoolean()
    published: boolean;

    @ApiProperty({
        description: 'Fecha de creación',
        example: '2021-01-01'
    })
    createAt?: Date;    

    @ApiProperty({
        description: 'Fecha de expiración',
        example: '2021-01-01'
    })
    expiredAt?: Date;

    @ApiProperty({
        description: 'ID del autor',
        example: 1
    })
    @IsNumber()
    authorId: number;

    @ApiProperty({
        description: 'ID del carro',
        example: 1
    })  
    @IsNumber()
    carId:number;

    @ApiProperty({
        description: 'ID de la marca',
        example: 1
    })  
    @IsNumber()
    brandId:number;

    @ApiProperty({
        description: 'Archivos de la publicación',
        example: [1, 2, 3]
    })
    @IsArray()
    files:CreateFileDto[];
}