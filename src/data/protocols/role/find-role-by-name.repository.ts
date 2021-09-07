import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';

export interface FindRoleByNameRepository {
  findByName: (name: string) => Promise<RoleEntity>;
}
