import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@/modules/users/dtos/create-user/create-user.dto';
import { CreateUserService } from '@/modules/users/services/create-user/create-user.service';
import { UserIdInputDto } from '@/modules/users/dtos/user-id-input/user-id-input.dto';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { ValidationParamsPipe } from '@/common/pipes/validation-params.pipe';
import { UserOutputType } from '@/modules/users/types/user-output.type';
import { LoadAllUsersService } from '@/modules/users/services/load-all-users/load-all-users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loadUserByIdService: LoadUserByIdService,
    private readonly loadAllUsersService: LoadAllUsersService,
  ) {}

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
    return await this.createUserService.add(createUserDto);
  }

  @Get('show/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load user by id.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  public async show(
    @Param(ValidationParamsPipe) userIdInputDto: UserIdInputDto,
  ): Promise<UserOutputType> {
    return await this.loadUserByIdService.loadById(userIdInputDto.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load all users.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No record found.',
  })
  public async loadAll(): Promise<UserOutputType[]> {
    return await this.loadAllUsersService.loadAll();
  }
}
