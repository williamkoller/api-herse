import { Pagination } from '@/shared/pagination/interfaces/pagination/pagination.interface';

export interface ResultWithPagination<T> {
  pagination: Pagination;
  results: T | T[];
}
