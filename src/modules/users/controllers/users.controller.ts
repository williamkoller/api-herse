import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@/modules/users/dtos/create-user/create-user.dto';
import { CreateUserService } from '@/modules/users/services/create-user/create-user.service';
import { UserIdInputDto } from '@/modules/users/dtos/user-id-input/user-id-input.dto';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { ValidationParamsPipe } from '@/common/pipes/validation-params.pipe';
import {
  UserOutput,
  UserParamsOutput,
} from '@/modules/users/interfaces/user-output.interface';
import { LoadAllUsersService } from '@/modules/users/services/load-all-users/load-all-users.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '@/modules/auth/guards/permissions.guard';
import { Permissions } from '@/modules/users/decorators/permissions.decorator';
import { UserPermissions } from '@/modules/users/enum/user-permissions.enum';
import { FilterUserDto } from '@/modules/users/dtos/filter-user/filter-user.dto';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination/result-with-pagination.interface';

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
    description: 'create a new user.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'email already in use.',
  })
  public async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserParamsOutput> {
    return await this.createUserService.create(createUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(UserPermissions.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load user by id.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  public async loadById(
    @Param(ValidationParamsPipe) userIdInputDto: UserIdInputDto,
  ): Promise<UserOutput> {
    return await this.loadUserByIdService.loadById(userIdInputDto.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(UserPermissions.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load all users.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No record found.',
  })
  public async loadAll(
    @Query(ValidationPipe) filterUserDto: FilterUserDto,
  ): Promise<ResultWithPagination<UserOutput[]>> {
    return await this.loadAllUsersService.findAll(filterUserDto);
  }
}
