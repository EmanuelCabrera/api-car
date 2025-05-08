import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsEmail } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'usuario@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'contraseña123'
    })
    @IsNotEmpty()
    password:string;
}
