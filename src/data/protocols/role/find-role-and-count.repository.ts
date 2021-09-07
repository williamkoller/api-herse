import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';

export interface FindRoleAndCountRepository {
  findRoleAndCount: (
    offset: number,
    limit: number,
  ) => Promise<[RoleEntity[], number]>;
}
