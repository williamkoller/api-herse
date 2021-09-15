import { ApiProperty } from '@nestjs/swagger';

export class TokenOutputDto {
  @ApiProperty()
  accessToken: string;
}
