import { Pagination } from '@/shared/pagination/interfaces/pagination/pagination.interface';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination/result-with-pagination.interface';
import { BuildPaginationObjectService } from '@/shared/pagination/services/build-pagination-object/build-pagination-object.service';
import { CalculateOffsetService } from '@/shared/pagination/services/calculate-offset/calculate-offset.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users.repository';
import { UserOutput } from '../../interfaces/user-output.interface';
import { usersTransformer } from '../../transformer/user/user.transformer';
import { FilterUserDto } from '../../dtos/filter-user/filter-user.dto';

@Injectable()
export class LoadAllUsersService {
  constructor(
    private readonly buildPaginationObjectService: BuildPaginationObjectService,
    private readonly calculateOffsetService: CalculateOffsetService,
    private readonly usersRepo: UsersRepository,
  ) {}

  public async findAll(
    filterUserDto: FilterUserDto,
  ): Promise<ResultWithPagination<UserOutput[]>> {
    const page = filterUserDto.page ?? 1;
    const limit = filterUserDto.limit ?? 10;

    const offset = this.calculateOffsetService.calculateOffset(page, limit);

    const [users, totalCount] = await this.usersRepo.findUserAndCount(
      offset,
      limit,
    );

    if (!users.length) {
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
      results: usersTransformer(users),
    };
  }
}
