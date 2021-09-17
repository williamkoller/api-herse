import { IsNotEmpty, IsString } from 'class-validator';

export class UserCpfInputDto {
  @IsString()
  @IsNotEmpty()
  cpf: string;
}
