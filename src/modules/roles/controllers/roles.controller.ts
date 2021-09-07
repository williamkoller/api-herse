import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination/result-with-pagination.interface';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { FilterRoleDto } from '@/modules/roles/dtos/filter-role/filter-role.dto';
import { LoadAllRolesService } from '@/modules/roles/services/load-all-roles/load-all-roles.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { AddRoleDto } from '../dtos/add-role/add-role.dto';
import { AddRoleService } from '../services/add-role/add-role.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly addRoleService: AddRoleService,
    private readonly loadAllRolesService: LoadAllRolesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new role.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'There is already a role with that name.',
  })
  public async add(@Body() addRoleDto: AddRoleDto): Promise<RoleEntity> {
    return await this.addRoleService.add(addRoleDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load all roles',
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
    @Query(ValidationPipe) filterRoleDto: FilterRoleDto,
  ): Promise<ResultWithPagination<RoleEntity[]>> {
    return await this.loadAllRolesService.findAll(filterRoleDto);
  }
}
