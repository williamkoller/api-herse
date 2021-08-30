import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@/modules/users/dtos/create-user/create-user.dto';
import { CreateUserService } from '@/modules/users/services/create-user/create-user.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a new user.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already in use.',
  })
  public async index(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.createUserService.execute(createUserDto);
  }
}
