import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
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
import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { LoadUserByCpfService } from '../services/load-user-by-cpf/load-user-by-cpf.service';
import { UserCpfInputDto } from '../dtos/user-cpf-input/user-cpf-input.dto';
import { UpdateUserService } from '../services/update-user/update-user.service';
import { UpdateUserDto } from '../dtos/update-user/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly loadUserByIdService: LoadUserByIdService,
    private readonly loadAllUsersService: LoadAllUsersService,
    private readonly loadUserByCpfService: LoadUserByCpfService,
    private readonly updateUserService: UpdateUserService,
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
  ): Promise<UserEntity> {
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

  @Get('load-user-by-cpf/:cpf')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(UserPermissions.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load user by CPF.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  public async loadUserByCpf(
    @Param(ValidationParamsPipe) userCpfInputDto: UserCpfInputDto,
  ): Promise<UserEntity> {
    return await this.loadUserByCpfService.loadUserByCpf(userCpfInputDto.cpf);
  }

  @Put('update-cpf-by-user/:id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(UserPermissions.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load user by CPF.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  public async updateCpfByUser(
    @Param(ValidationParamsPipe) userIdInputDto: UserIdInputDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    try {
      return await this.updateUserService.updateCpfByUser(
        userIdInputDto.id,
        updateUserDto,
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
