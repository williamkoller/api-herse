import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserOutputDto {
  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  token: string;
}
