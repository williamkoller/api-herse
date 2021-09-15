import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    each: true,
    message: 'Password with minimum of eight characters.',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(11, 11, { each: true, message: 'CPF must be eleven characters' })
  cpf: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(11, 11, { each: true, message: 'CNH must be eleven characters' })
  cnh: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(8, 8, { each: true, message: 'RG must be eight characters' })
  rg: string;
}
