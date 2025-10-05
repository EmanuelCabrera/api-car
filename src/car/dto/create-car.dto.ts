import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, MinLength, MaxLength, IsNotEmpty, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarDto {
    @ApiProperty({
        description: 'Nombre del carro',
        example: 'Toyota Corolla',
        minLength: 2,
        maxLength: 50
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'ID de la marca del carro',
        example: 1,
        minimum: 1
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    brandId: number;

    @ApiProperty({
        description: 'Año del modelo del carro',
        example: '2023-01-01'
    })
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    model: Date;
}
