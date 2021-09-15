import { Pagination } from '@/shared/pagination/interfaces/pagination/pagination.interface';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination/result-with-pagination.interface';
import { BuildPaginationObjectService } from '@/shared/pagination/services/build-pagination-object/build-pagination-object.service';
import { CalculateOffsetService } from '@/shared/pagination/services/calculate-offset/calculate-offset.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterRoleDto } from '@/modules/roles/dtos/filter-role/filter-role.dto';
import { RolesRepository } from '@/modules/roles/repositories/roles.repository';
import { rolesTransformer } from '../../transformer/roles/roles.transformer';
import { RoleOutputType } from '../../types/role.output.type';

@Injectable()
export class LoadAllRolesService {
  constructor(
    private readonly buildPaginationObjectService: BuildPaginationObjectService,
    private readonly calculateOffsetService: CalculateOffsetService,
    private readonly rolesRepo: RolesRepository,
  ) {}

  public async findAll(
    filterRoleDto: FilterRoleDto,
  ): Promise<ResultWithPagination<RoleOutputType[]>> {
    const page = filterRoleDto.page ?? 1;
    const limit = filterRoleDto.limit ?? 10;

    const offset = this.calculateOffsetService.calculateOffset(page, limit);

    const [roles, totalCount] = await this.rolesRepo.findRoleAndCount(
      offset,
      limit,
    );

    if (!roles.length) {
      throw new NotFoundException('No record found.');
    }

    const pagination: Pagination =
      this.buildPaginationObjectService.buildPaginationObject({
        limit,
        offset,
        page,
        totalCount,
      });

    return {
      pagination,
      results: rolesTransformer(roles),
    };
  }
}
