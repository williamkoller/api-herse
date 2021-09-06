import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UserIdInputDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
