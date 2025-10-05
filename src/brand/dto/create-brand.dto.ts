import { IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBrandDto {
    @ApiProperty({
        description: 'Nombre de la marca',
        example: 'Toyota'
    })
    @IsString()
    @IsNotEmpty()
    name: string
}
