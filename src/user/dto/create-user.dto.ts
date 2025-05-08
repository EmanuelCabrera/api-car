import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";    

export class CreateUserDto {
    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Emanuel'
    })          
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Apellido del usuario',
        example: 'Perez'
    })
    @IsString()
    @IsNotEmpty()
    surname: string;

    @ApiProperty({
        description: 'Email del usuario',
        example: 'emanuel@gmail.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: '123456'
    })  
    @IsString()
    password?: string;

    @ApiProperty({
        description: 'Rol del usuario',
        example: 'admin'
    })
    @IsString()
    @IsOptional()
    role: string;

    @ApiProperty({
        description: 'Foto del usuario',
        example: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    })
    @IsString()
    @IsOptional()
    picture?: string;

    @ApiProperty({
        description: 'Proveedor del usuario',
        example: 'google'
    })
    @IsString()
    @IsOptional()
    provider?: string;
}
