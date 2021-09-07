import { UserOutputType } from '@/modules/users/types/user-output.type';
import { ApiProperty } from '@nestjs/swagger';

export class UserOutputDto {
  @ApiProperty()
  user: UserOutputType;

  @ApiProperty()
  token: string;
}
