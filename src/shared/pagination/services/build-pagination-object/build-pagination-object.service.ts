import { Injectable } from '@nestjs/common';
import { PaginationDto } from '@/shared/pagination/dtos/pagination/pagination.dto';
import { Pagination } from '@/shared/pagination/interfaces/pagination/pagination.interface';

@Injectable()
export class BuildPaginationObjectService {
  public buildPaginationObject(paginationDto: PaginationDto): Pagination {
    const { totalCount, page } = paginationDto;

    const offset = Number(paginationDto.offset);
    const limit = Number(paginationDto.limit);

    const pageCount = Math.ceil(totalCount / limit);

    const result: Pagination = {
      page: Number(page),
      limit,
      offset,
      pageCount,
      totalCount,
    };

    return result;
  }
}
